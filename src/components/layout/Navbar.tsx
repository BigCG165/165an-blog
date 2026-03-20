import Link from "next/link";

const navLinks = [
  { label: "The Latest", href: "/" },
  { label: "About", href: "/about" },
];

function getCurrentDate(): string {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function Navbar() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      {/* Subtle gradient so text is readable over any image */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-transparent pointer-events-none" />

      <div className="relative px-4 sm:px-6 lg:px-8 pt-4 pb-6">
        {/* Date */}
        <p className="font-sans text-[10px] tracking-[0.12em] uppercase text-white/60 mb-4 text-center">
          {getCurrentDate()}
        </p>

        {/* Site name */}
        <div className="text-center mb-4">
          <Link
            href="/"
            style={{ fontFamily: "'Cormorant', Georgia, serif", fontWeight: 300, letterSpacing: "0.06em" }}
            className="text-5xl md:text-7xl text-white hover:text-white/70 transition-colors duration-200"
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
                  className="font-sans text-[10px] tracking-[0.14em] uppercase text-white/70 hover:text-white transition-colors duration-200"
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
