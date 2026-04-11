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
    requirements: "MANDATORY: Minimum 6 months internship or work experience in frontend development. Must have a certificate or verifiable project in React.js. Core skills required: React, JavaScript, TypeScript, HTML5, CSS3, Tailwind CSS, Git. Must demonstrate experience with REST API integration, responsive design, and at least one testing framework (Jest, Vitest, or Cypress). Portfolio or GitHub with live projects is required.",
  },
  {
    id: "backend",
    title: "Backend Developer",
    icon: Database,
    department: "Engineering",
    type: "Full-time",
    description: "Design and maintain scalable server-side applications, APIs, and database architectures. Ensure high availability, security, and data integrity across services.",
    requirements: "MANDATORY: Minimum 6 months internship or professional experience in backend development. Must hold a certification or have completed a verifiable backend project. Core skills required: Node.js or Python or Java, PostgreSQL, MongoDB, REST APIs, Docker, Git. Must have hands-on experience with authentication systems (JWT/OAuth), CI/CD pipelines, and at least one cloud platform (AWS, GCP, or Azure). Knowledge of microservices architecture is required.",
  },
  {
    id: "uiux",
    title: "UI/UX Designer",
    icon: Palette,
    department: "Design",
    type: "Full-time",
    description: "Create intuitive, visually appealing user interfaces and design systems. Conduct user research, build wireframes, prototypes, and deliver pixel-perfect designs.",
    requirements: "MANDATORY: Minimum 6 months internship or freelance experience in UI/UX design. Must have a design portfolio with at least 3 completed projects. Core skills required: Figma, Adobe XD, wireframing, prototyping, user research, usability testing. Must demonstrate knowledge of design systems, accessibility standards (WCAG), typography, color theory, and responsive design. Google UX Design Certificate or equivalent certification preferred.",
  },
  {
    id: "data-analyst",
    title: "Data Analyst",
    icon: BarChart3,
    department: "Analytics",
    type: "Full-time",
    description: "Analyze large datasets to extract meaningful insights, build dashboards, and support data-driven business decisions across teams.",
    requirements: "MANDATORY: Minimum 6 months internship or project experience in data analysis. Must have completed a certification in data analytics (Google Data Analytics, IBM Data Analyst, or equivalent). Core skills required: SQL, Python (Pandas, NumPy, Matplotlib), Excel (advanced formulas, pivot tables), Tableau or Power BI. Must demonstrate experience with data cleaning, statistical analysis (hypothesis testing, regression), ETL processes, and dashboard creation with real datasets.",
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity Analyst",
    icon: ShieldCheck,
    department: "Security",
    type: "Full-time",
    description: "Monitor and protect organizational systems from cyber threats. Conduct vulnerability assessments, implement security protocols, and respond to security incidents.",
    requirements: "MANDATORY: Minimum 6 months internship or hands-on experience in cybersecurity. Must hold at least one certification: CEH, CompTIA Security+, CISSP, or equivalent. Core skills required: network security, firewalls, IDS/IPS, SIEM tools (Splunk, QRadar), penetration testing, vulnerability scanning (Nessus, Burp Suite). Must have experience with incident response, encryption protocols, Linux security, and security auditing. Participation in CTF competitions or bug bounty programs is a plus.",
  },
  {
    id: "mobile",
    title: "Mobile App Developer",
    icon: Smartphone,
    department: "Engineering",
    type: "Full-time",
    description: "Develop and maintain cross-platform mobile applications with smooth performance and excellent user experience on both iOS and Android.",
    requirements: "MANDATORY: Minimum 6 months internship or experience building mobile applications. Must have at least one published app on Google Play Store or Apple App Store, or a verifiable mobile project on GitHub. Core skills required: React Native or Flutter or Swift or Kotlin, mobile UI/UX patterns, REST API integration, push notifications, local storage (SQLite/AsyncStorage). Must have experience with app store deployment process, mobile testing (Detox, XCTest), and Git version control.",
  },
  {
    id: "ml-engineer",
    title: "Machine Learning Engineer",
    icon: Brain,
    department: "AI & Research",
    type: "Full-time",
    description: "Build and deploy machine learning models to solve real-world business problems. Work on data pipelines, model training, and integration with production systems.",
    requirements: "MANDATORY: Minimum 6 months internship or research experience in machine learning. Must have completed a certification (TensorFlow Developer Certificate, AWS ML Specialty, or equivalent) or published ML project. Core skills required: Python, TensorFlow or PyTorch, scikit-learn, NumPy, Pandas. Must demonstrate hands-on experience with model training, hyperparameter tuning, data preprocessing, and at least one domain (NLP, computer vision, or recommendation systems). Experience with MLOps, Docker, and deploying models to production is required.",
  },
  {
    id: "project-manager",
    title: "Project Manager",
    icon: Briefcase,
    department: "Operations",
    type: "Full-time",
    description: "Lead cross-functional teams to deliver projects on time and within scope. Manage timelines, resources, risks, and stakeholder communication.",
    requirements: "MANDATORY: Minimum 1 year of experience managing projects or teams (internship counts). Must hold PMP, Scrum Master (CSM), or equivalent certification. Core skills required: Agile methodology, Scrum framework, Jira, Confluence, risk management, stakeholder communication. Must demonstrate experience leading a team of 3+ people, managing project timelines with Gantt charts, conducting sprint planning, and delivering at least 2 completed projects on time.",
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
