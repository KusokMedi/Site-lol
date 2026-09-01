import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const channel = searchParams.get("channel") || "kusokmedi";

  try {
    const response = await fetch(`https://www.youtube.com/@${channel}/videos`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    const html = await response.text();
    const match = html.match(/"videoId":"([a-zA-Z0-9_-]{11})"/);

    if (match) {
      return NextResponse.json({ videoId: match[1] });
    }

    return NextResponse.json({ error: "No video found" }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}