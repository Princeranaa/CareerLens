import { IResume } from "@/types/resume.type";
import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema<IResume>(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      default: "",
    },
    summary: {
      type: String,
      default: "",
    },
    personalInfo: {
      type: {
        fullname: String,
        email: String,
        mobile: String,
        location: String,
        github: String,
        Linkedin: String,
        portfolio: String,
      },
      default: {},
    },
    workExperience: {
      type: [
        {
          company: String,
          postion: String,
          startDate: String,
          endDate: String,
        },
      ],
      default: [],
    },
    eduction: {
      type: [
        {
          institute: String,
          degree: String,
        },
      ],
      default: [],
    },
    projects: {
      type: [
        {
          title: String,
          description: String,
          githubURL: String,
          liveUrl: String,
          techStack: [String],
        },
      ],
      default: [],
    },
    skills: {
      type: [String],
      default: [],
    },

    certifications: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true },
);

export const ResumeModel =
  mongoose.models.resume || mongoose.model("resume", resumeSchema);
