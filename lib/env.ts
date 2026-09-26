const FALLBACKS = {
  NEXT_PUBLIC_SITE_URL: "https://kusokmedi.lat",
  NEXT_PUBLIC_GITHUB_URL: "https://github.com/kusokmedi",
  NEXT_PUBLIC_GITHUB_ORG_URL: "https://github.com/kusokmedillc",
  NEXT_PUBLIC_K_SNAKE_URL: "https://github.com/KusokMedi/KSnake",
  NEXT_PUBLIC_SAVE_BOT_URL: "https://t.me/KusokMediSaveBot",
  NEXT_PUBLIC_ANON_SPEAK_URL: "https://t.me/AnonSpeakKM_bot",
  NEXT_PUBLIC_TELEGRAM_URL: "https://t.me/kusokmedi52",
  NEXT_PUBLIC_DISCORD_URL: "https://discord.gg/sX97m22zR9",
  NEXT_PUBLIC_YOUTUBE_MAIN_URL: "https://youtube.com/@kusokmedi",
  NEXT_PUBLIC_YOUTUBE_EN_URL: "https://youtube.com/@kexbytes",
  NEXT_PUBLIC_EMAIL: "kusokmedi@proton.me",
} as const;

export type PublicEnvKey = keyof typeof FALLBACKS;

/**
 * Reads a NEXT_PUBLIC_* variable, falling back to the default when it is
 * missing, empty or only whitespace (Vercel can inject empty strings).
 */
export function env(key: PublicEnvKey): string {
  const raw = process.env[key];
  const value = typeof raw === "string" ? raw.trim() : "";
  return value || FALLBACKS[key];
}

export const siteUrl = env("NEXT_PUBLIC_SITE_URL").replace(/\/+$/, "");

export function toUrl(value: string): URL {
  try {
    return new URL(value);
  } catch {
    return new URL(FALLBACKS.NEXT_PUBLIC_SITE_URL);
  }
}
