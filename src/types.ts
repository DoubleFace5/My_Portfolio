export interface Skill {
  name: string;
  category: "frontend" | "backend" | "database" | "other" | "design";
  level: number; // 1-5
  iconName: string;
  description: string;
}

export interface Education {
  year: string;
  institution: string;
  location: string;
  degree: string;
  details: string[];
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  linkedinUrl?: string;
  demoUrl?: string;
  videoUrl?: string;
  imageUrl?: string;
}

export interface Message {
  role: "user" | "model";
  text: string;
  timestamp: string;
}

export interface GameScore {
  game: "snake" | "bounce";
  score: number;
}
