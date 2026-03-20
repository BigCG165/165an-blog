import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Om 165:an",
  description: "Om bloggen 165:an.",
};

export default function OmPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-24">
      <p className="font-sans text-[10px] tracking-[0.18em] uppercase text-editorial-red mb-4">
        Om bloggen
      </p>
      <h1
        className="text-4xl md:text-5xl leading-tight text-editorial-black mb-8"
        style={{ fontFamily: "'Cormorant', Georgia, serif", fontWeight: 300 }}
      >
        Om 165:an
      </h1>
      <div className="border-t border-editorial-rule mb-8" />
      <div className="font-serif text-lg leading-relaxed text-editorial-black space-y-5">
        <p>
          Skriv något om dig själv och bloggen här. Vem är du? Varför skriver du?
          Vad handlar 165:an om?
        </p>
        <p>
          Det här är din plats att presentera dig på egna villkor.
        </p>
      </div>
    </div>
  );
}
