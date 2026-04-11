import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { resumeText, jobTitle, jobDescription } = await req.json();

    if (!resumeText || !jobTitle || !jobDescription) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const systemPrompt = `You are a STRICT and PRECISE HR resume screening assistant. Your job is to perform an EXACT skill-by-skill match between the candidate's resume and the job requirements. Do NOT be generous. Do NOT assume skills that are not explicitly mentioned in the resume.

STRICT MATCHING RULES:
1. Only count a skill as "matched" if it is EXPLICITLY and CLEARLY mentioned in the resume text. Do not infer or assume skills.
2. Related but different technologies do NOT count (e.g., "React" does NOT count for "Angular", "Python" does NOT count for "Java", "MySQL" does NOT count for "MongoDB").
3. Vague phrases like "various technologies" or "multiple frameworks" do NOT count as matching any specific skill.
4. The matchPercentage should be calculated as: (number of matched required skills / total number of required skills) * 100, rounded to nearest integer.
5. A candidate is "suitable" ONLY if matchPercentage >= 70 AND they have relevant experience.
6. Be harsh but fair. Most candidates should score between 20-60% unless they are a genuinely strong match.
7. Years of experience claims should be verified against the resume timeline - don't just take them at face value.
8. Education requirements must be explicitly met.

You MUST respond with valid JSON only, no markdown, no extra text.

Return this exact JSON structure:
{
  "matchPercentage": <number 0-100, calculated strictly as described above>,
  "suitable": <boolean, true ONLY if matchPercentage >= 70 AND relevant experience exists>,
  "matchedSkills": [<array of skills EXPLICITLY found in both resume and job description - be strict>],
  "missingSkills": [<array of ALL skills required by job but NOT explicitly mentioned in resume>],
  "summary": "<2-3 sentence HONEST assessment of the candidate's fit, noting specific gaps>",
  "suggestions": [<array of 2-4 specific suggestions listing exact skills they need to add>]
}`;

    const userPrompt = `**Job Title:** ${jobTitle}

**Job Description:**
${jobDescription}

**Candidate Resume:**
${resumeText}

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

    // Parse the JSON from AI response, handling possible markdown wrapping
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
