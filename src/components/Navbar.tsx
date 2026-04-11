import { Briefcase } from "lucide-react";

const Navbar = () => (
  <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
    <div className="container mx-auto flex h-16 items-center justify-between px-4">
      <a href="/" className="flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Briefcase className="h-4.5 w-4.5" />
        </div>
        <div className="leading-none">
          <span className="text-sm font-bold tracking-tight">TalentBridge</span>
          <span className="block text-[10px] font-medium tracking-widest uppercase text-muted-foreground">Technologies</span>
        </div>
      </a>
      <nav className="hidden md:flex items-center gap-8">
        <a href="#jobs" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Open Positions</a>
        <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
        <a href="#apply" className="text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 px-4 py-2 rounded-lg transition-colors">Apply Now</a>
      </nav>
    </div>
  </header>
);

export default Navbar;
