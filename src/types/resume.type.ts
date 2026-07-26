import { Types } from "mongoose";

export interface IPersonalInfo {
  fullname: string;
  email: string;
  mobile: string;
  location: string;
  github: string;
  Linkedin: string;
  portfolio: string;
}

export interface IworkExperience {
  company: string;
  postion: string;
  startDate: string;
  endDate: string;
}

export interface Iprojects {
  title: string;
  description: string;
  githubURL: string;
  liveUrl: string;
  techStack: string[];
}

export interface IEducation {
  institute: string;
  degree: string;
  startDate: string;
  endDate: string;
}

export interface IResume {
  _id?: string;
  user_id: Types.ObjectId;
  title: string;
  summary: string;
  personalInfo: IPersonalInfo;
  workExperience?: IworkExperience[];
  projects: Iprojects[];
  skills: string[];
  eduction: IEducation[];
  certifications?: string[];
  createdAt?:Date;
  updatedAt?: Date;
}
