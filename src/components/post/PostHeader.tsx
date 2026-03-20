import Image from "next/image";

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("sv-SE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

interface PostHeaderProps {
  title: string;
  date: string;
  author: string;
  category: string;
  image: string;
}

export default function PostHeader({ title, date, author, category, image }: PostHeaderProps) {
  return (
    <header>
      {/* Hero image */}
      {image && (
        <div className="relative w-full aspect-[16/9] mb-10">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
      )}

      {/* Text header — narrow column */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {category && (
          <p className="font-sans text-xs tracking-widest uppercase text-editorial-red font-medium mb-3">
            {category}
          </p>
        )}

        <h1 className="text-4xl md:text-5xl leading-tight text-editorial-black mb-5" style={{ fontFamily: "'Cormorant', Georgia, serif", fontWeight: 300 }}>
          {title}
        </h1>

        <div className="flex items-center gap-3 font-sans text-xs text-editorial-gray pb-6 border-b border-editorial-rule">
          {author && <span className="italic">Av {author}</span>}
          {author && date && <span className="text-editorial-rule">|</span>}
          {date && <span>{formatDate(date)}</span>}
        </div>
      </div>
    </header>
  );
}
