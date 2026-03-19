import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-editorial-cream mt-16 border-t border-editorial-rule">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <Link
            href="/"
            style={{ fontFamily: "'Cormorant', Georgia, serif", fontWeight: 300, letterSpacing: "0.06em" }}
            className="text-2xl uppercase text-editorial-black hover:text-editorial-red transition-colors"
          >
            My Blog
          </Link>
          <p className="font-sans text-xs text-editorial-gray tracking-widest uppercase">
            &copy; {year} All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
