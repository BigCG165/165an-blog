"use client";

import { useState } from "react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Något gick fel.");
      setStatus("success");
      setEmail("");
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Något gick fel.");
    }
  }

  return (
    <div className="bg-editorial-black text-white py-16 px-4">
      <div className="max-w-xl mx-auto text-center">
        <p className="font-sans text-[10px] tracking-[0.18em] uppercase text-white/40 mb-4">
          Nyhetsbrev
        </p>
        <h2
          className="text-3xl md:text-4xl text-white mb-4"
          style={{ fontFamily: "'Cormorant', Georgia, serif", fontWeight: 300 }}
        >
          Få nya inlägg direkt i inkorgen
        </h2>
        <p className="font-serif text-sm text-white/60 leading-relaxed mb-8">
          Inga spam. Bara ett mejl när ett nytt inlägg publiceras.
        </p>

        {status === "success" ? (
          <p className="font-serif text-base text-white/80">
            Du är nu prenumerant. Välkommen!
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="din@mejl.se"
              className="flex-1 bg-white/10 border border-white/20 text-white placeholder:text-white/30 font-serif text-sm px-4 py-3 focus:outline-none focus:border-white/60 transition-colors"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-white text-editorial-black font-sans text-[10px] tracking-[0.14em] uppercase px-6 py-3 hover:bg-white/90 transition-colors disabled:opacity-50"
            >
              {status === "loading" ? "Skickar..." : "Prenumerera"}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="font-sans text-xs text-editorial-red mt-3">{errorMsg}</p>
        )}
      </div>
    </div>
  );
}
