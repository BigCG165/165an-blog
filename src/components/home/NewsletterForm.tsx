"use client";

import { useState } from "react";

export default function NewsletterForm() {
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
    <div className="text-center max-w-xl mx-auto">
      <p className="font-sans text-[10px] tracking-[0.18em] uppercase text-editorial-gray mb-4">
        Nyhetsbrev
      </p>
      <h2
        className="text-3xl md:text-4xl text-editorial-black mb-3"
        style={{ fontFamily: "'Cormorant', Georgia, serif", fontWeight: 300 }}
      >
        Få nya inlägg direkt i inkorgen
      </h2>
      <p className="font-serif text-sm text-editorial-gray leading-relaxed mb-8">
        Inga spam. Bara ett mejl när ett nytt inlägg publiceras.
      </p>

      {status === "success" ? (
        <p className="font-serif text-base text-editorial-black">Du är nu prenumerant. Välkommen!</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="din@mejl.se"
            className="flex-1 bg-white border border-editorial-rule text-editorial-black placeholder:text-editorial-gray font-serif text-sm px-4 py-3 focus:outline-none focus:border-editorial-black transition-colors"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="bg-editorial-black text-white font-sans text-[10px] tracking-[0.14em] uppercase px-6 py-3 hover:bg-editorial-black/80 transition-colors disabled:opacity-50"
          >
            {status === "loading" ? "Skickar..." : "Prenumerera"}
          </button>
        </form>
      )}

      {status === "error" && (
        <p className="font-sans text-xs text-editorial-red mt-3">{errorMsg}</p>
      )}
    </div>
  );
}
