"use client";

export function GradientText({ children }: { children: React.ReactNode }) {
  return <span className="gradient-accent-text">{children}</span>;
}

export function parseGradientText(text: string): React.ReactNode[] {
  if (!text) return [];
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <GradientText key={i}>{part.slice(2, -2)}</GradientText>;
    }
    return part;
  });
}
