export interface Generatsummary {
  experienceLevel: string;
  skills: string[];
  jobtitle: string;
}

export interface GenerateSkills {
  experienceLevel: string;
  jobtitle: string;
}

export interface GenerateProject {
  experienceLevel: string;
  jobtitle: string;
  techStack: string[];
}

export interface GenerateExperience {
  experienceLevel: string;
  techStack: string[];
  jobRole:string
  YearsOfExperience: number;
}


