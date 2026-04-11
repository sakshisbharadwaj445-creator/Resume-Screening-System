import { CheckCircle2, XCircle, TrendingUp, Award, AlertTriangle } from "lucide-react";

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

  return (
    <section className="py-16 animate-slide-up">
      <div className="container mx-auto px-4 max-w-2xl space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Analysis Results</h2>

        {/* Match Score Card */}
        <div className="rounded-2xl bg-card p-8 shadow-[var(--shadow-elevated)] border border-border/50 text-center">
          <div className={`text-6xl md:text-7xl font-extrabold ${getMatchColor()} mb-2`}>
            {matchPercentage}%
          </div>
          <p className="text-muted-foreground mb-4">Match Score</p>

          {/* Progress bar */}
          <div className="h-3 w-full rounded-full bg-muted overflow-hidden mb-6">
            <div className={`h-full rounded-full ${getProgressColor()} animate-progress`} style={{ width: `${matchPercentage}%` }} />
          </div>

          {/* Verdict */}
          <div className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold ${
            suitable ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
          }`}>
            {suitable ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
            {suitable ? "Suitable Candidate" : "Not Suitable"}
          </div>
        </div>

        {/* Summary */}
        <div className="rounded-2xl bg-card p-6 shadow-[var(--shadow-card)] border border-border/50">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Summary</h3>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">{summary}</p>
        </div>

        {/* Skills */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Matched */}
          <div className="rounded-2xl bg-card p-6 shadow-[var(--shadow-card)] border border-border/50">
            <div className="flex items-center gap-2 mb-3">
              <Award className="h-5 w-5 text-success" />
              <h3 className="font-semibold">Matched Skills</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {matchedSkills.map((s) => (
                <span key={s} className="rounded-full bg-success/10 px-3 py-1 text-xs font-medium text-success">{s}</span>
              ))}
              {matchedSkills.length === 0 && <p className="text-sm text-muted-foreground">No matching skills found</p>}
            </div>
          </div>

          {/* Missing */}
          <div className="rounded-2xl bg-card p-6 shadow-[var(--shadow-card)] border border-border/50">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="h-5 w-5 text-warning" />
              <h3 className="font-semibold">Missing Skills</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {missingSkills.map((s) => (
                <span key={s} className="rounded-full bg-warning/10 px-3 py-1 text-xs font-medium text-warning">{s}</span>
              ))}
              {missingSkills.length === 0 && <p className="text-sm text-muted-foreground">No missing skills!</p>}
            </div>
          </div>
        </div>

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div className="rounded-2xl bg-card p-6 shadow-[var(--shadow-card)] border border-border/50">
            <h3 className="font-semibold mb-3">💡 Suggestions to Improve</h3>
            <ul className="space-y-2">
              {suggestions.map((s, i) => (
                <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                  <span className="text-primary font-bold mt-0.5">•</span>
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
