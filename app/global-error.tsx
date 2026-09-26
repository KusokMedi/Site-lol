"use client";

import en from "@/lib/locales/en.json";

// global-error.tsx replaces the root layout, so it cannot use LanguageProvider
// and has to inline its own copy of the strings. English is the right fallback:
// if the root layout itself crashed, the visitor's language is unknown.
const t = (key: string) => (en as Record<string, string>)[key] ?? key;

// global-error.tsx catches errors in the root layout itself.
// It must include its own <html> and <body> tags.
export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          backgroundColor: "#050505",
          color: "white",
          fontFamily: "system-ui, sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100dvh",
          padding: "1rem",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: "480px" }}>
          <div
            style={{
              fontFamily: "monospace",
              fontSize: "clamp(3rem, 12vw, 6rem)",
              fontWeight: 700,
              lineHeight: 1,
              background: "linear-gradient(135deg, #ffd700 0%, #ffb300 50%, #ff8c00 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: "1.5rem",
            }}
          >
            500
          </div>

          <h1
            style={{
              fontSize: "1.25rem",
              fontWeight: 600,
              color: "rgba(255,255,255,0.8)",
              marginBottom: "0.75rem",
            }}
          >
            {t("error.title")}
          </h1>

          <p
            style={{
              fontSize: "0.875rem",
              color: "rgba(255,255,255,0.4)",
              lineHeight: 1.6,
              marginBottom: "1.5rem",
            }}
          >
            {t("error.text")}
          </p>

          <button
            onClick={reset}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.625rem 1.25rem",
              borderRadius: "0.75rem",
              background: "linear-gradient(135deg, #ffd700 0%, #ffb300 60%, #ff8c00 100%)",
              color: "#050505",
              fontWeight: 600,
              fontSize: "0.875rem",
              border: "none",
              cursor: "pointer",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            {t("error.retry")}
          </button>
        </div>
      </body>
    </html>
  );
}
