export interface Project {
  title: string;
  description: string;
  image: string;
  gradient: string;
  tech: string[];
  features: string[];
  href: string;
  hrefLabel: string;
  github: string | null;
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
