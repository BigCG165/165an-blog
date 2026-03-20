import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const kv = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});
import { getAllPosts } from "@/lib/posts";

export async function GET(req: NextRequest) {
  if (req.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const lastSentRaw = await kv.get<string>("last_newsletter_sent");
    const lastSentDate = lastSentRaw ? new Date(lastSentRaw) : new Date(0);

    const posts = getAllPosts();
    const latest = posts[0];
    if (!latest) return NextResponse.json({ message: "Inga inlägg." });

    const latestPostDate = new Date(latest.date);
    if (latestPostDate <= lastSentDate) {
      return NextResponse.json({ message: "Inget nytt inlägg sedan senaste utskick." });
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://165an.se";
    await fetch(`${siteUrl}/api/send-newsletter`, {
      method: "POST",
      headers: { authorization: `Bearer ${process.env.CRON_SECRET}` },
    });

    return NextResponse.json({ success: true, triggered: true });
  } catch (err) {
    console.error("Cron error:", err);
    return NextResponse.json({ error: "Något gick fel." }, { status: 500 });
  }
}
