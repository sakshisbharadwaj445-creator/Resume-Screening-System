import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import JobListings, { type JobListing } from "@/components/JobListings";
import ResumeUploadForm from "@/components/ResumeUploadForm";
import ResultsDisplay, { type AnalysisResult } from "@/components/ResultsDisplay";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleSelectJob = (job: JobListing) => {
    setSelectedJob(job);
    setResult(null);
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const handleAnalyze = async (data: { resumeText?: string; resumeBase64?: string; resumeFileName?: string; jobTitle: string; jobDescription: string }) => {
    setIsLoading(true);
    setResult(null);
    try {
      const { data: fnData, error } = await supabase.functions.invoke("analyze-resume", {
        body: data,
      });

      if (error) {
        console.error("Function error:", error);
        toast.error("Analysis failed. Please try again.");
        return;
      }

      setResult(fnData as AnalysisResult);
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    } catch (e) {
      console.error(e);
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <div className="border-t border-border/40">
        <JobListings onSelectJob={handleSelectJob} selectedJobId={selectedJob?.id ?? null} />
      </div>
      <div ref={formRef} className="border-t border-border/40">
        <ResumeUploadForm onAnalyze={handleAnalyze} isLoading={isLoading} selectedJob={selectedJob} />
      </div>
      <div ref={resultsRef}>
        {result && (
          <div className="border-t border-border/40">
            <ResultsDisplay result={result} jobTitle={selectedJob?.title} />
          </div>
        )}
      </div>
      <footer className="border-t border-border/40 bg-card/50 py-10">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-2 .89-2 2v11c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/></svg>
            </div>
            <span className="text-sm font-bold">TalentBridge Technologies</span>
          </div>
          <p className="text-xs text-muted-foreground">AI-Powered Resume Screening System · © {new Date().getFullYear()}</p>
          <p className="text-[10px] text-muted-foreground/60 mt-2">Built for accurate, unbiased candidate evaluation</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
