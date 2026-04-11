import { Building2, Users, Shield } from "lucide-react";

const features = [
  { icon: Building2, title: "Industry Leader", desc: "TalentBridge connects top talent with the right opportunities" },
  { icon: Users, title: "Smart Matching", desc: "AI-powered resume screening for perfect job-candidate fit" },
  { icon: Shield, title: "Fair & Unbiased", desc: "Objective skill-based evaluation for every applicant" },
];

const HeroSection = () => (
  <section className="relative overflow-hidden py-16 lg:py-24">
    <div className="absolute inset-0 -z-10">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-[300px] w-[400px] rounded-full bg-accent/5 blur-3xl" />
    </div>

    <div className="container mx-auto px-4 text-center">
      <div className="animate-slide-up">
        <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
          TalentBridge Technologies
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
          Find Your Perfect{" "}
          <span className="gradient-text">Career Match</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
          Browse our open positions, submit your resume, and instantly discover how well your skills align with the role. Let AI do the screening.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto animate-fade-in">
        {features.map((f) => (
          <div key={f.title} className="rounded-xl bg-card p-6 shadow-[var(--shadow-card)] border border-border/50 hover:shadow-[var(--shadow-elevated)] transition-shadow duration-300">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <f.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-1">{f.title}</h3>
            <p className="text-sm text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HeroSection;
