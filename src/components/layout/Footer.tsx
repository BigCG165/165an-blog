import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="kontakt" className="bg-editorial-cream mt-16 border-t border-editorial-rule">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Logo */}
          <div>
            <Link
              href="/"
              style={{ fontFamily: "'Cormorant', Georgia, serif", fontWeight: 300, letterSpacing: "0.06em" }}
              className="text-2xl text-editorial-black hover:text-editorial-red transition-colors"
            >
              165:an
            </Link>
          </div>

          {/* Kontakt */}
          <div>
            <p className="font-sans text-[10px] tracking-[0.14em] uppercase text-editorial-gray mb-3">Kontakt</p>
            <a
              href="mailto:hej@165an.se"
              className="font-serif text-sm text-editorial-black hover:text-editorial-red transition-colors block mb-1"
            >
              hej@165an.se
            </a>
            <p className="font-serif text-sm text-editorial-gray">Stockholm, Sverige</p>
          </div>

          {/* Copyright */}
          <div className="md:text-right">
            <p className="font-sans text-[10px] tracking-widest uppercase text-editorial-gray">
              &copy; {year} 165:an
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
