import { Briefcase, Code, Database, Palette, BarChart3, ShieldCheck, Smartphone, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface JobListing {
  id: string;
  title: string;
  icon: React.ElementType;
  department: string;
  type: string;
  description: string;
  requirements: string;
}

export const jobListings: JobListing[] = [
  {
    id: "frontend",
    title: "Frontend Developer",
    icon: Code,
    department: "Engineering",
    type: "Full-time",
    description: "Build responsive, high-performance web interfaces using modern frameworks. Collaborate with designers and backend engineers to deliver seamless user experiences.",
    requirements: "Proficiency in React, TypeScript, HTML5, CSS3, Tailwind CSS. Experience with REST APIs, Git, responsive design, and performance optimization. Knowledge of testing frameworks like Jest or Vitest is a plus.",
  },
  {
    id: "backend",
    title: "Backend Developer",
    icon: Database,
    department: "Engineering",
    type: "Full-time",
    description: "Design and maintain scalable server-side applications, APIs, and database architectures. Ensure high availability, security, and data integrity across services.",
    requirements: "Strong skills in Node.js, Python, or Java. Experience with PostgreSQL, MongoDB, REST/GraphQL APIs, Docker, and cloud platforms (AWS/GCP). Understanding of microservices, authentication, and CI/CD pipelines.",
  },
  {
    id: "uiux",
    title: "UI/UX Designer",
    icon: Palette,
    department: "Design",
    type: "Full-time",
    description: "Create intuitive, visually appealing user interfaces and design systems. Conduct user research, build wireframes, prototypes, and deliver pixel-perfect designs.",
    requirements: "Proficiency in Figma, Adobe XD, or Sketch. Strong understanding of design principles, typography, color theory, accessibility standards, and user-centered design. Experience with design systems and responsive layouts.",
  },
  {
    id: "data-analyst",
    title: "Data Analyst",
    icon: BarChart3,
    department: "Analytics",
    type: "Full-time",
    description: "Analyze large datasets to extract meaningful insights, build dashboards, and support data-driven business decisions across teams.",
    requirements: "Proficiency in SQL, Python (Pandas, NumPy), Excel, and data visualization tools like Tableau or Power BI. Experience with statistical analysis, data cleaning, and reporting. Knowledge of machine learning basics is a plus.",
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity Analyst",
    icon: ShieldCheck,
    department: "Security",
    type: "Full-time",
    description: "Monitor and protect organizational systems from cyber threats. Conduct vulnerability assessments, implement security protocols, and respond to security incidents.",
    requirements: "Knowledge of network security, firewalls, IDS/IPS, encryption, and SIEM tools. Experience with penetration testing, vulnerability scanning, and incident response. Certifications like CEH, CompTIA Security+, or CISSP preferred.",
  },
  {
    id: "mobile",
    title: "Mobile App Developer",
    icon: Smartphone,
    department: "Engineering",
    type: "Full-time",
    description: "Develop and maintain cross-platform mobile applications with smooth performance and excellent user experience on both iOS and Android.",
    requirements: "Experience with React Native, Flutter, or Swift/Kotlin. Understanding of mobile UI/UX patterns, app store deployment, push notifications, and offline storage. Familiarity with REST APIs and mobile testing tools.",
  },
  {
    id: "ml-engineer",
    title: "Machine Learning Engineer",
    icon: Brain,
    department: "AI & Research",
    type: "Full-time",
    description: "Build and deploy machine learning models to solve real-world business problems. Work on data pipelines, model training, and integration with production systems.",
    requirements: "Strong Python skills with TensorFlow, PyTorch, or scikit-learn. Experience with NLP, computer vision, or recommendation systems. Knowledge of MLOps, Docker, and cloud ML services (AWS SageMaker, GCP Vertex AI).",
  },
  {
    id: "project-manager",
    title: "Project Manager",
    icon: Briefcase,
    department: "Operations",
    type: "Full-time",
    description: "Lead cross-functional teams to deliver projects on time and within scope. Manage timelines, resources, risks, and stakeholder communication.",
    requirements: "Experience with Agile/Scrum methodologies, project management tools (Jira, Trello, Asana). Strong communication, leadership, and organizational skills. PMP or Scrum Master certification is a plus.",
  },
];

interface JobListingsProps {
  onSelectJob: (job: JobListing) => void;
  selectedJobId: string | null;
}

const JobListings = ({ onSelectJob, selectedJobId }: JobListingsProps) => (
  <section id="jobs" className="py-16">
    <div className="container mx-auto px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">Open Positions</h2>
      <p className="text-muted-foreground text-center mb-10 max-w-xl mx-auto">
        Select a role you're interested in, then submit your resume to see how well you match.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
        {jobListings.map((job) => {
          const isSelected = selectedJobId === job.id;
          return (
            <button
              key={job.id}
              onClick={() => onSelectJob(job)}
              className={`text-left rounded-xl p-5 border transition-all duration-200 cursor-pointer group ${
                isSelected
                  ? "border-primary bg-primary/5 shadow-[var(--shadow-elevated)] ring-2 ring-primary/20"
                  : "border-border/50 bg-card shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] hover:border-primary/30"
              }`}
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg mb-3 ${
                isSelected ? "bg-primary/20" : "bg-primary/10 group-hover:bg-primary/15"
              }`}>
                <job.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-sm mb-1">{job.title}</h3>
              <p className="text-xs text-muted-foreground mb-2">{job.department} · {job.type}</p>
              <p className="text-xs text-muted-foreground line-clamp-2">{job.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  </section>
);

export default JobListings;
