"use client";

import { useEffect, useRef } from "react";

export default function DownloadTrigger({
  href,
  fileName,
}: {
  href: string;
  fileName: string;
}) {
  const link = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    // Same-origin links with a `download` attribute are saved instead of opened.
    link.current?.click();
  }, []);

  return (
    <a
      ref={link}
      href={href}
      download={fileName}
      style={{ color: "LinkText", overflowWrap: "anywhere" }}
    >
      click here
    </a>
  );
}
