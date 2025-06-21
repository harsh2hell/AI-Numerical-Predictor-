import { useState } from "react";
import jsPDF from "jspdf";

export default function ResumeGenerator() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    jobTitle: "",
    experience: "",
    skills: "",
  });

  const [resumeText, setResumeText] = useState("");
  const [coverLetterText, setCoverLetterText] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateResume = () => {
    const resume = `Resume\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nJob Title: ${formData.jobTitle}\n\nExperience:\n${formData.experience}\n\nSkills:\n${formData.skills}`;
    setResumeText(resume);
  };

  const generateCoverLetter = () => {
    const cover = `Dear Hiring Manager,\n\nI am excited to apply for the position of ${formData.jobTitle}. With experience in ${formData.experience}, I believe I can contribute effectively to your team.\n\nMy key skills include ${formData.skills}. I look forward to the opportunity to discuss how I can bring value to your company.\n\nSincerely,\n${formData.name}`;
    setCoverLetterText(cover);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text(resumeText + "\n\n" + coverLetterText, 10, 10);
    doc.save("resume_cover_letter.pdf");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">AI Resume & Cover Letter Generator</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(formData).map(([key, value]) => (
          <input
            key={key}
            name={key}
            placeholder={key.replace(/([A-Z])/g, " $1")}
            className="border p-2 rounded"
            value={value}
            onChange={handleChange}
          />
        ))}
      </div>
      <div className="space-x-2">
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={generateResume}>Generate Resume</button>
        <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={generateCoverLetter}>Generate Cover Letter</button>
        <button className="bg-gray-800 text-white px-4 py-2 rounded" onClick={downloadPDF}>Download PDF</button>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Preview:</h2>
        <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap">{resumeText + "\n\n" + coverLetterText}</pre>
      </div>
    </div>
  );
}