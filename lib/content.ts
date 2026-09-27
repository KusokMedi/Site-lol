import { env } from "./env";

/**
 * Content lists shared by the designed site and the design-free copy at
 * "/simple/".
 *
 * Only data lives here: icons, layout and animation stay in the components, so
 * the plain copy reuses the exact same content without pulling in any design.
 * The texts themselves come from the locale files, as everywhere else.
 */

export const serviceKeys = [
  "web", "bots", "backend", "linux", "programs", "audit", "hosting", "support", "api",
] as const;

export type ServiceKey = (typeof serviceKeys)[number];

export const highlightKeys = ["experience", "projects", "tech", "commits"] as const;

export type HighlightKey = (typeof highlightKeys)[number];

export type ProjectEntry = {
  /** Dictionary prefix - "project.{key}.title", ".desc", ".detail1..3". */
  key: string;
  tech: string[];
  href: string;
  linkKey: string;
};

export const projectEntries: ProjectEntry[] = [
  {
    key: "ksnake",
    tech: ["C++", "SDL2", "CMake", "nlohmann/json"],
    href: env("NEXT_PUBLIC_K_SNAKE_URL"),
    linkKey: "project.link.github",
  },
  {
    key: "savebot",
    tech: ["Python", "aiogram", "yt-dlp", "FFmpeg"],
    href: env("NEXT_PUBLIC_SAVE_BOT_URL"),
    linkKey: "project.link.telegram",
  },
  {
    key: "anonspeak",
    tech: ["Python", "aiogram", "SQLite"],
    href: env("NEXT_PUBLIC_ANON_SPEAK_URL"),
    linkKey: "project.link.telegram",
  },
];

export type SocialEntry = {
  name: string;
  url: string;
};

export const socialEntries: SocialEntry[] = [
  { name: "GitHub", url: env("NEXT_PUBLIC_GITHUB_URL") },
  { name: "GitHub Organization", url: env("NEXT_PUBLIC_GITHUB_ORG_URL") },
  { name: "Discord", url: env("NEXT_PUBLIC_DISCORD_URL") },
  { name: "Telegram", url: env("NEXT_PUBLIC_TELEGRAM_URL") },
];

export type YouTubeChannel = {
  name: string;
  url: string;
  lang: string;
};

export const youtubeChannels: YouTubeChannel[] = [
  { name: "@kusokmedi", url: env("NEXT_PUBLIC_YOUTUBE_MAIN_URL"), lang: "ru" },
  { name: "@kexbytes", url: env("NEXT_PUBLIC_YOUTUBE_EN_URL"), lang: "en" },
];
