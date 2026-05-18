export interface Message {
  id: string;
  text: string;
  type: "user" | "assistant";
  timestamp: Date;
}

export interface ChatResponse {
  success: boolean;
  reply?: string;
  error?: string;
}

declare global {
  interface Window {
    webkitSpeechRecognition: unknown;
    SpeechRecognition: unknown;
  }
}
export interface ProfileData {
  hero: {
    name: string;
    title: string;
    experience: string;
    description: string;
    avatar: string;
  };
  techStack: string[];
  projects: Project[];
  approach: {
    development: string[];
    aiTools: string[];
  };
  social: {
    github: string;
    telegram: string;
    email: string;
  };
}

export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  github?: string;
  demo?: string;
}
