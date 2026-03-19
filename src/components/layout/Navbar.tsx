import Link from "next/link";

const navLinks = [
  { label: "The Latest", href: "/" },
  { label: "Culture", href: "/?category=Culture" },
  { label: "Politics", href: "/?category=Politics" },
  { label: "Technology", href: "/?category=Technology" },
  { label: "Travel", href: "/?category=Travel" },
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
    <header className="bg-editorial-cream border-b border-editorial-rule">
      {/* Date bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-0">
        <p className="font-sans text-[10px] tracking-[0.12em] uppercase text-editorial-gray">
          {getCurrentDate()}
        </p>
      </div>

      {/* Site name */}
      <div className="py-5 text-center px-4">
        <Link
          href="/"
          style={{ fontFamily: "'Cormorant', Georgia, serif", fontWeight: 300, letterSpacing: "0.06em" }}
          className="text-5xl md:text-7xl uppercase text-editorial-black hover:text-editorial-red transition-colors duration-200"
        >
          My Blog
        </Link>
      </div>

      {/* Navigation links */}
      <nav className="pb-3 px-4">
        <ul className="flex flex-wrap justify-center gap-x-7 gap-y-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-sans text-[10px] tracking-[0.14em] uppercase text-editorial-black hover:text-editorial-red transition-colors duration-200"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
