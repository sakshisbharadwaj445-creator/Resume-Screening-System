import { ArrowDown, Sparkles, Target, ShieldCheck } from "lucide-react";

const stats = [
  { value: "500+", label: "Resumes Screened" },
  { value: "8", label: "Open Roles" },
  { value: "95%", label: "Accuracy Rate" },
];

const features = [
  { icon: Sparkles, title: "AI-Powered Screening", desc: "Advanced AI reads and analyzes your resume against exact job requirements" },
  { icon: Target, title: "Precise Matching", desc: "Strict skill-by-skill keyword matching — no guesswork, only facts" },
  { icon: ShieldCheck, title: "Fair Evaluation", desc: "Objective, unbiased screening based purely on your skills and experience" },
];

const HeroSection = () => (
  <section className="relative overflow-hidden">
    {/* Background decorations */}
    <div className="absolute inset-0 -z-10">
      <div className="absolute top-0 left-1/4 h-[600px] w-[600px] rounded-full bg-primary/[0.04] blur-3xl" />
      <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-accent/[0.04] blur-3xl" />
    </div>

    <div className="container mx-auto px-4 pt-20 pb-16 lg:pt-28 lg:pb-20">
      {/* Badge */}
      <div className="text-center animate-slide-up">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary mb-8">
          <Sparkles className="h-3.5 w-3.5" />
          AI-Powered Resume Screening
        </span>
      </div>

      {/* Heading */}
      <div className="text-center animate-slide-up max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6">
          Discover Your Perfect{" "}
          <span className="gradient-text">Career Fit</span>
          {" "}at TalentBridge
        </h1>
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Browse open positions, upload your resume or enter your skills, and get an instant AI-powered analysis of how well you match — with detailed skill breakdowns and actionable feedback.
        </p>

        {/* CTA */}
        <a
          href="#jobs"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-primary/35 hover:bg-primary/90 transition-all duration-200"
        >
          View Open Positions
          <ArrowDown className="h-4 w-4" />
        </a>
      </div>

      {/* Stats row */}
      <div className="flex justify-center gap-12 mt-16 animate-fade-in">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-foreground">{s.value}</div>
            <div className="text-xs text-muted-foreground mt-1 font-medium">{s.label}</div>
          </div>
        ))}
      </div>

      {/* How it works */}
      <div id="how-it-works" className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto mt-20 animate-fade-in">
        {features.map((f, i) => (
          <div key={f.title} className="relative rounded-2xl bg-card p-7 border border-border/60 shadow-sm hover:shadow-[var(--shadow-elevated)] hover:border-primary/20 transition-all duration-300 group">
            <div className="absolute top-5 right-5 text-[56px] font-black text-muted/30 leading-none select-none">
              {i + 1}
            </div>
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/15 transition-colors">
              <f.icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-semibold text-sm mb-1.5">{f.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HeroSection;
