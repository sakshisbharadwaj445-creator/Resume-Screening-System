import { CheckCircle2, XCircle, TrendingUp, Award, AlertTriangle, Lightbulb } from "lucide-react";

export interface AnalysisResult {
  matchPercentage: number;
  suitable: boolean;
  matchedSkills: string[];
  missingSkills: string[];
  summary: string;
  suggestions: string[];
}

interface ResultsDisplayProps {
  result: AnalysisResult;
}

const ResultsDisplay = ({ result }: ResultsDisplayProps) => {
  const { matchPercentage, suitable, matchedSkills, missingSkills, summary, suggestions } = result;

  const getMatchColor = () => {
    if (matchPercentage >= 75) return "text-success";
    if (matchPercentage >= 50) return "text-warning";
    return "text-destructive";
  };

  const getProgressColor = () => {
    if (matchPercentage >= 75) return "bg-success";
    if (matchPercentage >= 50) return "bg-warning";
    return "bg-destructive";
  };

  const getRingColor = () => {
    if (matchPercentage >= 75) return "ring-success/20";
    if (matchPercentage >= 50) return "ring-warning/20";
    return "ring-destructive/20";
  };

  return (
    <section className="py-16 animate-slide-up">
      <div className="container mx-auto px-4 max-w-3xl space-y-5">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold">Analysis Results</h2>
          <p className="text-sm text-muted-foreground mt-2">Here's how your profile matches the job requirements</p>
        </div>

        {/* Match Score Card */}
        <div className="rounded-2xl bg-card p-10 shadow-[var(--shadow-elevated)] border border-border/50 text-center">
          <div className={`inline-flex items-center justify-center h-32 w-32 rounded-full ring-4 ${getRingColor()} bg-muted/30 mb-5`}>
            <div>
              <span className={`text-5xl font-extrabold ${getMatchColor()}`}>{matchPercentage}</span>
              <span className={`text-xl font-bold ${getMatchColor()}`}>%</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-5 font-medium">Overall Match Score</p>

          {/* Progress bar */}
          <div className="h-2.5 w-full max-w-md mx-auto rounded-full bg-muted overflow-hidden mb-6">
            <div className={`h-full rounded-full ${getProgressColor()} animate-progress`} style={{ width: `${matchPercentage}%` }} />
          </div>

          {/* Verdict */}
          <div className={`inline-flex items-center gap-2.5 rounded-full px-6 py-3 text-sm font-semibold ${
            suitable
              ? "bg-success/10 text-success ring-1 ring-success/20"
              : "bg-destructive/10 text-destructive ring-1 ring-destructive/20"
          }`}>
            {suitable ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
            {suitable ? "Suitable Candidate" : "Not Suitable for This Role"}
          </div>
        </div>

        {/* Summary */}
        <div className="rounded-2xl bg-card p-6 border border-border/50 shadow-sm">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <TrendingUp className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-semibold">Assessment Summary</h3>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed pl-[42px]">{summary}</p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Matched */}
          <div className="rounded-2xl bg-card p-6 border border-border/50 shadow-sm">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-success/10">
                <Award className="h-4 w-4 text-success" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Matched Skills</h3>
                <p className="text-xs text-muted-foreground">{matchedSkills.length} skills found</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {matchedSkills.map((s) => (
                <span key={s} className="inline-flex items-center gap-1 rounded-lg bg-success/10 px-3 py-1.5 text-xs font-medium text-success ring-1 ring-success/20">
                  <CheckCircle2 className="h-3 w-3" />
                  {s}
                </span>
              ))}
              {matchedSkills.length === 0 && <p className="text-sm text-muted-foreground italic">No matching skills found</p>}
            </div>
          </div>

          {/* Missing */}
          <div className="rounded-2xl bg-card p-6 border border-border/50 shadow-sm">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-warning/10">
                <AlertTriangle className="h-4 w-4 text-warning" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Missing Skills</h3>
                <p className="text-xs text-muted-foreground">{missingSkills.length} skills needed</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {missingSkills.map((s) => (
                <span key={s} className="inline-flex items-center gap-1 rounded-lg bg-warning/10 px-3 py-1.5 text-xs font-medium text-warning ring-1 ring-warning/20">
                  <XCircle className="h-3 w-3" />
                  {s}
                </span>
              ))}
              {missingSkills.length === 0 && <p className="text-sm text-muted-foreground italic">No missing skills!</p>}
            </div>
          </div>
        </div>

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div className="rounded-2xl bg-card p-6 border border-border/50 shadow-sm">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
                <Lightbulb className="h-4 w-4 text-accent" />
              </div>
              <h3 className="font-semibold">Suggestions to Improve</h3>
            </div>
            <ul className="space-y-3 pl-[42px]">
              {suggestions.map((s, i) => (
                <li key={i} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary mt-0.5">{i + 1}</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default ResultsDisplay;
