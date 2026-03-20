import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const kv = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Ogiltig mejladress." }, { status: 400 });
    }

    // Check for duplicates (sismember = "is member of set")
    const already = await kv.sismember("subscribers", email);
    if (already) {
      return NextResponse.json({ error: "Den här mejladressen är redan registrerad." }, { status: 409 });
    }

    // Add to subscribers set
    await kv.sadd("subscribers", email);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Subscribe error:", err);
    return NextResponse.json({ error: "Något gick fel. Försök igen." }, { status: 500 });
  }
}
