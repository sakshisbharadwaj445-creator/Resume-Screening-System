import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Download, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import jsPDF from "jspdf";

const jobOptions = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Data Scientist",
  "UI/UX Designer",
  "DevOps Engineer",
  "Mobile App Developer",
  "AI/ML Engineer",
];

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  linkedin: string;
  jobApplying: string;
  testDate: string;
  highestQualification: string;
  yearsOfExperience: string;
  additionalNotes: string;
}

const RegisterScreening = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const passedJobTitle = (location.state as any)?.jobTitle || "";

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    linkedin: "",
    jobApplying: passedJobTitle,
    testDate: "",
    highestQualification: "",
    yearsOfExperience: "",
    additionalNotes: "",
  });

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone || !formData.jobApplying || !formData.testDate) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSubmitted(true);
    toast.success("Successfully registered for screening test!");
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // Header
    doc.setFillColor(30, 64, 175);
    doc.rect(0, 0, pageWidth, 40, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("TalentBridge Technologies", pageWidth / 2, 18, { align: "center" });
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Screening Test Registration Form", pageWidth / 2, 30, { align: "center" });

    // Body
    doc.setTextColor(0, 0, 0);
    let y = 55;
    const leftMargin = 20;

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Candidate Details", leftMargin, y);
    y += 3;
    doc.setDrawColor(30, 64, 175);
    doc.setLineWidth(0.5);
    doc.line(leftMargin, y, pageWidth - leftMargin, y);
    y += 12;

    const fields: { label: string; value: string }[] = [
      { label: "Full Name", value: formData.fullName },
      { label: "Email Address", value: formData.email },
      { label: "Phone Number", value: formData.phone },
      { label: "LinkedIn Profile", value: formData.linkedin || "N/A" },
      { label: "Job Applying For", value: formData.jobApplying },
      { label: "Preferred Test Date", value: formData.testDate },
      { label: "Highest Qualification", value: formData.highestQualification || "N/A" },
      { label: "Years of Experience", value: formData.yearsOfExperience || "N/A" },
    ];

    doc.setFontSize(11);
    fields.forEach((f) => {
      doc.setFont("helvetica", "bold");
      doc.text(`${f.label}:`, leftMargin, y);
      doc.setFont("helvetica", "normal");
      doc.text(f.value, leftMargin + 55, y);
      y += 10;
    });

    if (formData.additionalNotes) {
      y += 5;
      doc.setFont("helvetica", "bold");
      doc.text("Additional Notes:", leftMargin, y);
      y += 8;
      doc.setFont("helvetica", "normal");
      const lines = doc.splitTextToSize(formData.additionalNotes, pageWidth - 2 * leftMargin);
      doc.text(lines, leftMargin, y);
      y += lines.length * 6;
    }

    // Footer
    y += 15;
    doc.setDrawColor(200, 200, 200);
    doc.line(leftMargin, y, pageWidth - leftMargin, y);
    y += 8;
    doc.setFontSize(9);
    doc.setTextColor(120, 120, 120);
    doc.text(`Registration Date: ${new Date().toLocaleDateString()}`, leftMargin, y);
    doc.text("This is a system-generated document.", pageWidth - leftMargin, y, { align: "right" });

    doc.save(`Registration_${formData.fullName.replace(/\s+/g, "_")}.pdf`);
    toast.success("Registration form downloaded!");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <Button variant="ghost" className="mb-6 gap-2" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4" /> Back to Results
        </Button>

        {!submitted ? (
          <>
            <div className="text-center mb-8">
              <h1 className="text-2xl md:text-3xl font-bold">Registration Form for Screening Test</h1>
              <p className="text-sm text-muted-foreground mt-2">Fill in your details to register for the screening test</p>
            </div>

            <form onSubmit={handleSubmit} className="rounded-2xl bg-card p-8 border border-border/50 shadow-sm space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input id="fullName" placeholder="John Doe" value={formData.fullName} onChange={(e) => handleChange("fullName", e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input id="email" type="email" placeholder="john@example.com" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input id="phone" type="tel" placeholder="+91 9876543210" value={formData.phone} onChange={(e) => handleChange("phone", e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn Profile</Label>
                  <Input id="linkedin" placeholder="linkedin.com/in/johndoe" value={formData.linkedin} onChange={(e) => handleChange("linkedin", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="job">Job Applying For *</Label>
                  <Select value={formData.jobApplying} onValueChange={(v) => handleChange("jobApplying", v)}>
                    <SelectTrigger><SelectValue placeholder="Select a job" /></SelectTrigger>
                    <SelectContent>
                      {jobOptions.map((j) => <SelectItem key={j} value={j}>{j}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="testDate">Preferred Test Date *</Label>
                  <Input id="testDate" type="date" value={formData.testDate} onChange={(e) => handleChange("testDate", e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="qualification">Highest Qualification</Label>
                  <Select value={formData.highestQualification} onValueChange={(v) => handleChange("highestQualification", v)}>
                    <SelectTrigger><SelectValue placeholder="Select qualification" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="High School">High School</SelectItem>
                      <SelectItem value="Bachelor's Degree">Bachelor's Degree</SelectItem>
                      <SelectItem value="Master's Degree">Master's Degree</SelectItem>
                      <SelectItem value="PhD">PhD</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Select value={formData.yearsOfExperience} onValueChange={(v) => handleChange("yearsOfExperience", v)}>
                    <SelectTrigger><SelectValue placeholder="Select experience" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-1 years">0-1 years</SelectItem>
                      <SelectItem value="1-3 years">1-3 years</SelectItem>
                      <SelectItem value="3-5 years">3-5 years</SelectItem>
                      <SelectItem value="5-10 years">5-10 years</SelectItem>
                      <SelectItem value="10+ years">10+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea id="notes" placeholder="Any additional information..." value={formData.additionalNotes} onChange={(e) => handleChange("additionalNotes", e.target.value)} rows={3} />
              </div>

              <Button type="submit" size="lg" className="w-full text-base">Submit Registration</Button>
            </form>
          </>
        ) : (
          <div className="rounded-2xl bg-card p-10 border border-border/50 shadow-sm text-center space-y-6">
            <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-success/10 ring-4 ring-success/20">
              <CheckCircle2 className="h-10 w-10 text-success" />
            </div>
            <h2 className="text-2xl font-bold">Successfully Registered for Screening Test</h2>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              Your registration has been submitted. You will receive a confirmation at <span className="font-medium text-foreground">{formData.email}</span>.
            </p>
            <div className="pt-4">
              <Button size="lg" className="gap-2" onClick={handleDownloadPDF}>
                <Download className="h-4 w-4" /> Download Registration Form
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterScreening;
