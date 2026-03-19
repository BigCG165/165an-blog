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
    <article className="grid grid-cols-1 lg:grid-cols-2 gap-0 pb-12 mb-12">
      {/* Image — left column */}
      {post.image && (
        <Link href={`/posts/${post.slug}`} className="block overflow-hidden group order-1 lg:order-2">
          <div className="relative w-full aspect-[4/3] lg:aspect-auto lg:h-full min-h-[280px] overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
        </Link>
      )}

      {/* Text — right column */}
      <div className="flex flex-col justify-center order-2 lg:order-1 lg:pr-12 pt-6 lg:pt-0">
        {post.category && (
          <p className="font-sans text-[10px] tracking-[0.18em] uppercase text-editorial-red mb-3">
            {post.category}
          </p>
        )}

        <h2 className="font-serif text-3xl md:text-4xl font-bold leading-tight text-editorial-black mb-4">
          <Link
            href={`/posts/${post.slug}`}
            className="hover:text-editorial-red transition-colors duration-200"
          >
            {post.title}
          </Link>
        </h2>

        {post.excerpt && (
          <p className="font-serif text-base text-editorial-gray leading-relaxed mb-6">
            {post.excerpt}
          </p>
        )}

        <div className="flex items-center gap-2 font-sans text-[11px] text-editorial-gray pt-4 mt-auto">
          {post.author && <span className="italic">By {post.author}</span>}
          {post.author && post.date && <span>&middot;</span>}
          {post.date && <span>{formatDate(post.date)}</span>}
        </div>
      </div>
    </article>
  );
}
