"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const navLinks = [
  { label: "om 165:an", href: "/om" },
  { label: "nyhetsbrev", href: "/#nyhetsbrev" },
  { label: "läs mer", href: "/#las-mer" },
  { label: "kontakt", href: "/#kontakt" },
];

function getCurrentDate(): string {
  return new Date().toLocaleDateString("sv-SE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [scrollY, setScrollY] = useState(0);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    function onScroll() {
      const current = window.scrollY;
      setScrollY(current);
      if (current < 50) {
        setVisible(true);
      } else if (current > lastScrollY.current) {
        setVisible(false); // scrollar ner
      } else {
        setVisible(true); // scrollar upp
      }
      lastScrollY.current = current;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isTransparent = isHome && scrollY < 50;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Gradient — alltid i DOM, tonas ut vid scroll */}
      <div className={`absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-transparent pointer-events-none transition-opacity duration-500 ${isTransparent ? "opacity-100" : "opacity-0"}`} />

      {/* Solid bakgrund — alltid i DOM, tonas in vid scroll */}
      <div className={`absolute inset-0 bg-editorial-cream border-b border-editorial-rule pointer-events-none transition-opacity duration-500 ${isTransparent ? "opacity-0" : "opacity-100"}`} />

      <div className="relative px-4 sm:px-6 lg:px-8 pt-4 pb-6">
        {/* Date */}
        <p
          className={`font-sans text-[10px] tracking-[0.12em] uppercase mb-4 text-center transition-colors duration-500 ${
            isTransparent ? "text-white/60" : "text-editorial-gray"
          }`}
        >
          {getCurrentDate()}
        </p>

        {/* Site name */}
        <div className="text-center mb-4">
          <Link
            href="/"
            style={{ fontFamily: "'Cormorant', Georgia, serif", fontWeight: 300, letterSpacing: "0.06em" }}
            className={`text-5xl md:text-7xl transition-colors duration-500 ${
              isTransparent
                ? "text-white hover:text-white/70"
                : "text-editorial-black hover:text-editorial-red"
            }`}
          >
            165:an
          </Link>
        </div>

        {/* Nav links */}
        <nav>
          <ul className="flex justify-center gap-7">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`font-sans text-[10px] tracking-[0.14em] uppercase transition-colors duration-200 ${
                    isTransparent
                      ? "text-white/70 hover:text-white"
                      : "text-editorial-gray hover:text-editorial-red"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
