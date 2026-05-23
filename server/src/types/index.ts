export interface ChatRequest {
  message: string;
}

export interface ChatResponse {
  success: boolean;
  reply?: string;
  error?: string;
}

export interface ErrorResponse {
  error: string;
  status?: number;
}
export interface WorkExperience {
  company: string;
  period: string;
  position: string;
  achievements: string[];
}

export interface Project {
  title: string;
  description: string;
}

export interface Education {
  institution: string;
  year: string;
  degree: string;
  field: string;
}

export interface Course {
  name: string;
  year: string;
  specialization: string;
}

export interface Language {
  name: string;
  level: string;
}

export interface ProfileData {
  hero: {
    name: string;
    age: number;
    birthDate: string;
    title: string;
    experience: string;
    location: string;
    relocation: string;
  };
  techStack: string[];
  workExperience: WorkExperience[];
  projects: Project[];
  education: Education[];
  courses: Course[];
  languages: Language[];
  approach: {
    development: string[];
    aiTools: string[];
  };
  interests: string[];
  social: {
    github: string;
    telegram: string;
    email: string;
    phone: string;
  };
}
