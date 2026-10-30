"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Eye, Download, Sparkles, Mail, Phone, MapPin } from "lucide-react";
import { useParams } from "next/navigation";

interface Resume {
  title: string;
  summary: string;

  personalInfo: {
    fullname: string;
    email: string;
    mobile: string;
    location: string;
    github: string;
    portfolio: string;
  };

  education: {
    institute: string;
    degree: string;
    startDate: string;
    endDate: string;
  }[];

  skills: string[];

  projects: {
    title: string;
    description: string;
    techStack: string[];
    githubUrl: string;
    liveUrl: string;
  }[];

  workExperience: {
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];

  certifications: string[];
}

export default function ResumePreviewPage() {
  const [resume, setResume] = useState<Resume | null>(null);

  const [loading, setLoading] = useState(true);

  const { resumeId } = useParams();

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const { data } = await axios.get(`/api/resume/${resumeId}`);

      console.log("main resume in data", data);

      setResume(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading Resume...
      </div>
    );
  }

  if (!resume) return null;

  return (
    <div className="min-h-screen bg-[#eef0f5]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-[280px_minmax(0,1fr)] gap-8 items-start">
          {/* Resume Actions */}
          <aside className="lg:sticky lg:top-8">
            <div className="bg-[#171b2d] text-white rounded-2xl p-6 shadow-xl">
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={20} className="text-violet-400" />
                  <span className="text-violet-300 text-sm font-semibold tracking-wide">
                    RESUME BUILDER
                  </span>
                </div>
                <h2 className="text-2xl font-bold">Your Resume</h2>
                <p className="text-slate-400 text-sm mt-2">
                  Manage and improve your professional profile.
                </p>
              </div>

              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 bg-violet-600 hover:bg-violet-500 text-white px-4 py-3.5 rounded-xl font-medium transition-all duration-200 hover:shadow-lg hover:shadow-violet-900/30">
                  <Sparkles size={19} />
                  ATS Score
                </button>

                <button className="w-full flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-3.5 rounded-xl font-medium transition-all duration-200">
                  <Download size={19} className="text-violet-300" />
                  Download PDF
                </button>

                <button className="w-full flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-3.5 rounded-xl font-medium transition-all duration-200">
                  <Eye size={19} className="text-violet-300" />
                  Edit Resume
                </button>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                  Resume Preview
                </p>
                <p className="text-sm text-slate-300 mt-2">
                  Review your information before downloading.
                </p>
              </div>
            </div>
          </aside>

          {/* Resume Preview */}
          <main className="min-w-0">
            <div className="flex flex-wrap justify-between items-center gap-3 mb-5">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Resume Preview
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Your professional profile at a glance
                </p>
              </div>

              <span className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-600 px-3 py-2 rounded-lg text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Live Preview
              </span>
            </div>

            <div
              id="resume-preview"
              className="bg-white text-slate-800 shadow-[0_10px_50px_rgba(15,23,42,0.10)] border border-slate-200 rounded-xl p-6 sm:p-10 lg:p-14"
            >
              {/* Header */}
              <header className="pb-7 border-b-2 border-slate-800">
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
                  {resume.personalInfo?.fullname}
                </h1>

                <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-600">
                  {resume.personalInfo?.email && (
                    <span className="flex items-center gap-2">
                      <Mail size={15} className="text-violet-600" />
                      {resume.personalInfo.email}
                    </span>
                  )}

                  {resume.personalInfo?.mobile && (
                    <span className="flex items-center gap-2">
                      <Phone size={15} className="text-violet-600" />
                      {resume.personalInfo.mobile}
                    </span>
                  )}

                  {resume.personalInfo?.location && (
                    <span className="flex items-center gap-2">
                      <MapPin size={15} className="text-violet-600" />
                      {resume.personalInfo.location}
                    </span>
                  )}
                </div>

                <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                  {resume.personalInfo?.github && (
                    <a
                      href={resume.personalInfo.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-violet-700 hover:text-violet-900 underline underline-offset-4 break-all"
                    >
                      GitHub
                    </a>
                  )}

                  {resume.personalInfo?.portfolio && (
                    <a
                      href={resume.personalInfo.portfolio}
                      target="_blank"
                      rel="noreferrer"
                      className="text-violet-700 hover:text-violet-900 underline underline-offset-4 break-all"
                    >
                      Portfolio
                    </a>
                  )}
                </div>
              </header>

              {/* Summary */}
              {resume.summary && (
                <section className="mt-8">
                  <h2 className="text-lg font-bold text-slate-950 uppercase tracking-wide mb-3">
                    Professional Summary
                  </h2>
                  <div className="w-12 h-1 bg-violet-600 rounded-full mb-4" />
                  <p className="text-[15px] leading-7 text-slate-700">
                    {resume.summary}
                  </p>
                </section>
              )}

              {/* Skills */}
              {resume.skills?.length > 0 && (
                <section className="mt-8">
                  <h2 className="text-lg font-bold text-slate-950 uppercase tracking-wide mb-3">
                    Technical Skills
                  </h2>
                  <div className="w-12 h-1 bg-violet-600 rounded-full mb-4" />

                  <div className="flex flex-wrap gap-2">
                    {resume.skills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-slate-100 border border-slate-200 text-slate-800 px-3.5 py-2 rounded-lg text-sm font-medium hover:bg-violet-50 hover:border-violet-200 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {/* Experience */}
              {resume.workExperience?.length > 0 && (
                <section className="mt-9">
                  <h2 className="text-lg font-bold text-slate-950 uppercase tracking-wide mb-3">
                    Work Experience
                  </h2>
                  <div className="w-12 h-1 bg-violet-600 rounded-full mb-6" />

                  <div className="space-y-7">
                    {resume.workExperience.map((exp, index) => (
                      <div
                        key={index}
                        className="relative pl-5 border-l-2 border-slate-200"
                      >
                        <div className="absolute -left-[6px] top-1.5 w-2.5 h-2.5 rounded-full bg-violet-600" />

                        <div className="flex flex-wrap justify-between items-start gap-2">
                          <h3 className="text-base font-bold text-slate-900">
                            {exp.position}
                          </h3>
                          <span className="text-xs font-semibold text-violet-700 bg-violet-50 px-3 py-1.5 rounded-md">
                            {exp.startDate} - {exp.endDate}
                          </span>
                        </div>

                        <p className="text-sm font-semibold text-slate-600 mt-1">
                          {exp.company}
                        </p>

                        <p className="mt-3 text-[14px] leading-7 text-slate-700 whitespace-pre-line">
                          {exp.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Projects */}
              {resume.projects?.length > 0 && (
                <section className="mt-9">
                  <h2 className="text-lg font-bold text-slate-950 uppercase tracking-wide mb-3">
                    Projects
                  </h2>
                  <div className="w-12 h-1 bg-violet-600 rounded-full mb-6" />

                  <div className="space-y-6">
                    {resume.projects.map((project, index) => (
                      <div key={index}>
                        <h3 className="text-base font-bold text-slate-900">
                          {project.title}
                        </h3>

                        <p className="mt-2 text-[14px] leading-7 text-slate-700">
                          {project.description}
                        </p>

                        {project.techStack?.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {project.techStack.map((tech) => (
                              <span
                                key={tech}
                                className="text-xs font-semibold text-violet-700 bg-violet-50 border border-violet-100 px-2.5 py-1.5 rounded-md"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Education */}
              {resume.education?.length > 0 && (
                <section className="mt-9">
                  <h2 className="text-lg font-bold text-slate-950 uppercase tracking-wide mb-3">
                    Education
                  </h2>
                  <div className="w-12 h-1 bg-violet-600 rounded-full mb-6" />

                  <div className="space-y-5">
                    {resume.education.map((edu, index) => (
                      <div key={index}>
                        <div className="flex flex-wrap justify-between gap-2">
                          <h3 className="font-bold text-slate-900">
                            {edu.degree}
                          </h3>
                          <span className="text-xs text-slate-500 font-medium">
                            {edu.startDate} - {edu.endDate}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 mt-1">
                          {edu.institute}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Certifications */}
              {resume.certifications?.length > 0 && (
                <section className="mt-9">
                  <h2 className="text-lg font-bold text-slate-950 uppercase tracking-wide mb-3">
                    Certifications
                  </h2>
                  <div className="w-12 h-1 bg-violet-600 rounded-full mb-5" />

                  <ul className="space-y-3">
                    {resume.certifications.map((cert, index) => (
                      <li
                        key={index}
                        className="flex gap-3 text-sm text-slate-700"
                      >
                        <span className="text-violet-600 font-bold">•</span>
                        {cert}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
