import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { resumeText, resumeBase64, jobTitle, jobDescription } = await req.json();

    if ((!resumeText && !resumeBase64) || !jobTitle || !jobDescription) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    // Step 1: If PDF, extract text using Gemini vision
    let finalResumeText = resumeText || "";

    if (resumeBase64) {
      console.log("Extracting text from PDF using Gemini vision...");
      const extractResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            {
              role: "user",
              content: [
                { type: "text", text: "Extract ALL text from this PDF resume document. Return ONLY the raw text content, preserving the structure. Do not add any commentary or formatting." },
                {
                  type: "image_url",
                  image_url: {
                    url: `data:application/pdf;base64,${resumeBase64}`,
                  },
                },
              ],
            },
          ],
        }),
      });

      if (!extractResponse.ok) {
        const t = await extractResponse.text();
        console.error("PDF extraction error:", extractResponse.status, t);
        throw new Error("Failed to read PDF. Please try uploading a .txt file instead.");
      }

      const extractData = await extractResponse.json();
      finalResumeText = extractData.choices?.[0]?.message?.content || "";
      console.log("Extracted text length:", finalResumeText.length);

      if (!finalResumeText || finalResumeText.length < 20) {
        throw new Error("Could not extract readable text from PDF. Please try a .txt file.");
      }
    }

    if (!finalResumeText.trim()) {
      return new Response(JSON.stringify({ error: "No readable text found in resume" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Step 2: Analyze the resume against job requirements
    const systemPrompt = `You are an EXTREMELY STRICT resume screening system. You perform LITERAL, EXACT keyword matching ONLY. You are NOT generous. You are a machine that checks if exact words exist.

ABSOLUTE RULES - FOLLOW THESE WITHOUT EXCEPTION:
1. ONLY count a skill as "matched" if the EXACT skill name or its widely-accepted abbreviation appears WORD-FOR-WORD in the resume. Nothing else counts.
2. DO NOT infer skills from job titles, project descriptions, or context. If "React" is not literally written, it is NOT matched - even if they say "built web applications."
3. DO NOT give credit for related/similar technologies. "JavaScript" does NOT match "TypeScript". "SQL" does NOT match "MongoDB". "AWS" does NOT match "cloud computing."
4. DO NOT count soft skills or generic phrases. "Team player", "hard working", "problem solver" match NOTHING.
5. If the resume contains NO relevant technical skills for the job, the matchPercentage MUST be 0-5%.
6. If the resume is from a completely different field (e.g., a marketing resume for a developer job), matchPercentage MUST be 0%.
7. The matchPercentage formula is STRICTLY: (number of EXACT keyword matches / total required skills listed in job description) * 100.
8. A candidate is "suitable" ONLY if matchPercentage >= 75.
9. When in doubt, do NOT match. Default to NOT matching.
10. Count the actual required skills in the job description. List ALL of them in missingSkills if not found.
11. An empty or irrelevant resume = 0% match, empty matchedSkills array, and NOT suitable.

You MUST respond with valid JSON only, no markdown, no extra text.

Return this exact JSON structure:
{
  "matchPercentage": <number 0-100, usually LOW unless skills literally match>,
  "suitable": <boolean, true ONLY if matchPercentage >= 75>,
  "matchedSkills": [<ONLY skills where the EXACT keyword appears in the resume>],
  "missingSkills": [<ALL required skills from job description not found verbatim in resume>],
  "summary": "<2-3 sentence BLUNT assessment. If no skills match, say so clearly.>",
  "suggestions": [<list the exact skills they need to learn/add>]
}`;

    const userPrompt = `**Job Title:** ${jobTitle}

**Job Description:**
${jobDescription}

**Candidate Resume:**
${finalResumeText}

Analyze this resume against the job requirements and return the JSON result.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited. Please try again in a moment." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      throw new Error("AI gateway error");
    }

    const aiData = await response.json();
    const content = aiData.choices?.[0]?.message?.content;

    if (!content) throw new Error("No content from AI");

    let parsed;
    try {
      const cleaned = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      parsed = JSON.parse(cleaned);
    } catch {
      console.error("Failed to parse AI response:", content);
      throw new Error("Invalid AI response format");
    }

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("analyze-resume error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
