"use client";

export function GradientText({ children }: { children: React.ReactNode }) {
  return <span className="gradient-accent-text">{children}</span>;
}

const EMPHASIS = /\*\*([^*]+)\*\*/g;

/**
 * Turns the `**highlighted**` markers used in the locale files into gradient
 * spans. Unmatched asterisks are left alone, so a stray `*` in a translation
 * cannot swallow the rest of the sentence.
 */
export function parseGradientText(text: string): React.ReactNode {
  if (!text) return [];

  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  // Fresh regex per call: a shared /g regex keeps lastIndex between calls.
  EMPHASIS.lastIndex = 0;
  while ((match = EMPHASIS.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    nodes.push(<GradientText key={match.index}>{match[1]}</GradientText>);
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}
