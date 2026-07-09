import type { LucideIcon } from "lucide-react";

export interface Project {
  title: string;
  description: string;
  image: string;
  gradient: string;
  tech: string[];
  result: string;
  github: string;
  demo: string | null;
}

export interface Skill {
  name: string;
  level: number;
}

export interface GitHubRepo {
  name: string;
  description: string;
  url: string;
  lang: string;
}

export interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  details: string[];
}

export interface Highlight {
  icon: LucideIcon;
  label: string;
  value: string;
  desc: string;
}