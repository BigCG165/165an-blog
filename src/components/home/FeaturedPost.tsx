import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/lib/types";

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function FeaturedPost({ post }: { post: Post }) {
  return (
    <article className="mb-14">
      <Link href={`/posts/${post.slug}`} className="group block relative w-full min-h-screen overflow-hidden">
        {post.image ? (
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            sizes="100vw"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-editorial-black" />
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

        {/* Text at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          {post.category && (
            <p className="font-sans text-[10px] tracking-[0.18em] uppercase text-white/60 mb-3">
              {post.category}
            </p>
          )}
          <h2 className="font-serif text-3xl md:text-5xl font-bold leading-tight text-white max-w-3xl mb-3">
            {post.title}
          </h2>
          {post.excerpt && (
            <p className="font-serif text-sm md:text-base text-white/75 leading-relaxed max-w-2xl mb-4 hidden md:block">
              {post.excerpt}
            </p>
          )}
          <div className="flex items-center gap-2 font-sans text-[11px] text-white/50">
            {post.author && <span className="italic">By {post.author}</span>}
            {post.author && post.date && <span>&middot;</span>}
            {post.date && <span>{formatDate(post.date)}</span>}
          </div>
        </div>
      </Link>
    </article>
  );
}
