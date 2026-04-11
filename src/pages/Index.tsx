import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
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
    <div className="min-h-screen">
      <HeroSection />
      <JobListings onSelectJob={handleSelectJob} selectedJobId={selectedJob?.id ?? null} />
      <div ref={formRef}>
        <ResumeUploadForm onAnalyze={handleAnalyze} isLoading={isLoading} selectedJob={selectedJob} />
      </div>
      <div ref={resultsRef}>
        {result && <ResultsDisplay result={result} />}
      </div>
      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        <p>TalentBridge Technologies © {new Date().getFullYear()} — Resume Screening System</p>
      </footer>
    </div>
  );
};

export default Index;
