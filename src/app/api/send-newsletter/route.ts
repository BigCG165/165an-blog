import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const kv = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});
import { Resend } from "resend";
import { getAllPosts } from "@/lib/posts";

export async function POST(req: NextRequest) {
  if (req.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const emails = (await kv.smembers("subscribers")) as string[];
    if (!emails || emails.length === 0) {
      return NextResponse.json({ message: "Inga prenumeranter." });
    }

    const posts = getAllPosts();
    const latest = posts[0];
    if (!latest) {
      return NextResponse.json({ message: "Inga inlägg." });
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://165an.se";
    const postUrl = `${siteUrl}/posts/${latest.slug}`;
    const resend = new Resend(process.env.RESEND_API_KEY);

    const results = await Promise.allSettled(
      emails.map((email) =>
        resend.emails.send({
          from: "165:an <noreply@165an.se>",
          to: email,
          subject: latest.title,
          html: `
            <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
              <h1 style="font-size: 2rem; font-weight: 300; margin-bottom: 1rem;">${latest.title}</h1>
              <p style="font-size: 1rem; line-height: 1.7; color: #6b6b6b; margin-bottom: 2rem;">${latest.excerpt}</p>
              <a href="${postUrl}" style="background: #1a1a1a; color: #fff; padding: 12px 24px; text-decoration: none; font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase;">
                Läs inlägget
              </a>
              <hr style="margin: 2rem 0; border: none; border-top: 1px solid #d4d0c8;" />
              <p style="font-size: 0.75rem; color: #6b6b6b;">
                Du får detta mejl för att du prenumererar på 165:an.
              </p>
            </div>
          `,
        })
      )
    );

    await kv.set("last_newsletter_sent", new Date().toISOString());

    const sent = results.filter((r) => r.status === "fulfilled").length;
    return NextResponse.json({ success: true, sent });
  } catch (err) {
    console.error("Send newsletter error:", err);
    return NextResponse.json({ error: "Något gick fel." }, { status: 500 });
  }
}
