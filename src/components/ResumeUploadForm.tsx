import { useState, useRef } from "react";
import { Upload, FileText, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface ResumeUploadFormProps {
  onAnalyze: (data: { resumeText: string; jobTitle: string; jobDescription: string }) => void;
  isLoading: boolean;
}

const ResumeUploadForm = ({ onAnalyze, isLoading }: ResumeUploadFormProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
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
    if (!file) { toast.error("Please upload a resume"); return; }
    if (!jobTitle.trim()) { toast.error("Please enter a job title"); return; }
    if (!jobDescription.trim()) { toast.error("Please enter a job description"); return; }

    const resumeText = await file.text();
    onAnalyze({ resumeText, jobTitle: jobTitle.trim(), jobDescription: jobDescription.trim() });
  };

  return (
    <section id="upload" className="py-16">
      <div className="container mx-auto px-4 max-w-2xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Upload & Analyze
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl bg-card p-8 shadow-[var(--shadow-card)] border border-border/50 animate-scale-in">
          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium mb-2">Resume File</label>
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
            <p className="text-xs text-muted-foreground mt-1.5">Note: For best results, use .txt format. PDF parsing extracts raw text.</p>
          </div>

          {/* Job Title */}
          <div>
            <label className="block text-sm font-medium mb-2">Job Title</label>
            <Input placeholder="e.g. Frontend Developer" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} maxLength={100} />
          </div>

          {/* Job Description */}
          <div>
            <label className="block text-sm font-medium mb-2">Job Description</label>
            <Textarea placeholder="Paste the full job description here..." value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} rows={6} maxLength={5000} />
          </div>

          <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <><Loader2 className="h-5 w-5 animate-spin" /> Analyzing...</>
            ) : (
              <>Analyze Resume</>
            )}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ResumeUploadForm;
