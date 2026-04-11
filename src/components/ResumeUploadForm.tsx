import { useState, useRef } from "react";
import { Upload, FileText, X, Loader2, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import type { JobListing } from "./JobListings";

interface ResumeUploadFormProps {
  onAnalyze: (data: { resumeText?: string; resumeBase64?: string; resumeFileName?: string; jobTitle: string; jobDescription: string }) => void;
  isLoading: boolean;
  selectedJob: JobListing | null;
}

const ResumeUploadForm = ({ onAnalyze, isLoading, selectedJob }: ResumeUploadFormProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [manualText, setManualText] = useState("");
  const [inputMode, setInputMode] = useState<"upload" | "type">("upload");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    if (selected.size > 5 * 1024 * 1024) {
      toast.error("File too large. Max 5MB.");
      return;
    }
    setFile(selected);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) { toast.error("Please select a job position first"); return; }

    let resumeText = "";
    if (inputMode === "upload") {
      if (!file) { toast.error("Please upload a resume"); return; }
      resumeText = await file.text();
    } else {
      if (!manualText.trim()) { toast.error("Please enter your skills and expertise"); return; }
      resumeText = manualText.trim();
    }

    onAnalyze({
      resumeText,
      jobTitle: selectedJob.title,
      jobDescription: selectedJob.requirements,
    });
  };

  if (!selectedJob) return null;

  return (
    <section id="apply" className="py-16">
      <div className="container mx-auto px-4 max-w-2xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Apply for Position
        </h2>

        {/* Selected Job Summary */}
        <div className="rounded-xl bg-primary/5 border border-primary/20 p-4 mb-6 flex items-start gap-3 animate-fade-in">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <Briefcase className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">{selectedJob.title}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{selectedJob.department} · {selectedJob.type}</p>
            <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed"><strong>Looking for:</strong> {selectedJob.requirements}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl bg-card p-8 shadow-[var(--shadow-card)] border border-border/50 animate-scale-in">
          <Tabs value={inputMode} onValueChange={(v) => setInputMode(v as "upload" | "type")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload">Upload Resume</TabsTrigger>
              <TabsTrigger value="type">Type Skills</TabsTrigger>
            </TabsList>

            <TabsContent value="upload" className="mt-4">
              <input ref={fileInputRef} type="file" accept=".txt,.pdf,.doc,.docx" onChange={handleFileChange} className="hidden" />
              {!file ? (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full flex flex-col items-center gap-3 rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 p-8 hover:border-primary/50 hover:bg-primary/10 transition-colors cursor-pointer"
                >
                  <Upload className="h-10 w-10 text-primary/60" />
                  <span className="text-sm text-muted-foreground">Click to upload resume (.txt, .pdf, .doc)</span>
                </button>
              ) : (
                <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/50 p-4">
                  <FileText className="h-8 w-8 text-primary" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
                  </div>
                  <button type="button" onClick={() => { setFile(null); if(fileInputRef.current) fileInputRef.current.value=""; }} className="text-muted-foreground hover:text-destructive transition-colors">
                    <X className="h-5 w-5" />
                  </button>
                </div>
              )}
              <p className="text-xs text-muted-foreground mt-1.5">For best results, use .txt format.</p>
            </TabsContent>

            <TabsContent value="type" className="mt-4">
              <Textarea
                placeholder="Describe your skills, experience, education, and expertise...&#10;&#10;Example: 3 years of experience in React, TypeScript, Node.js. Built e-commerce platforms. B.Tech in Computer Science."
                value={manualText}
                onChange={(e) => setManualText(e.target.value)}
                rows={8}
                maxLength={5000}
              />
            </TabsContent>
          </Tabs>

          <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <><Loader2 className="h-5 w-5 animate-spin" /> Analyzing...</>
            ) : (
              <>Check My Match</>
            )}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ResumeUploadForm;
