import type { Project, Skill } from "./types";

// ─── Skills ───────────────────────────────────────────────────────────────────
// Used by components/Skills.tsx for the radial-progress grid.
export const mainSkills: Skill[] = [
  { name: "Linux",      level: 100 },
  { name: "Python",     level: 97  },
  { name: "Git",        level: 90  },
  { name: "Java",       level: 90  },
  { name: "Node.js",    level: 85  },
  { name: "React",      level: 85  },
  { name: "HTML",       level: 90  },
  { name: "JavaScript", level: 80  },
  { name: "Docker",     level: 85  },
  { name: "TypeScript", level: 80  },
];

// ─── Projects ─────────────────────────────────────────────────────────────────
// All text content lives in lib/locales/*.json for i18n.
// Add real project entries here when ready to display them in Projects.tsx.
export const projects: Project[] = [];
