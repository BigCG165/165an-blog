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

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="flex flex-col pt-1">
      {/* Image */}
      {post.image && (
        <Link href={`/posts/${post.slug}`} className="block overflow-hidden group mb-4">
          <div className="relative w-full aspect-[3/2] overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        </Link>
      )}

      {/* Category */}
      {post.category && (
        <p className="font-sans text-[10px] tracking-[0.18em] uppercase text-editorial-red mb-2">
          {post.category}
        </p>
      )}

      {/* Title */}
      <h2 className="text-lg leading-snug text-editorial-black mb-2" style={{ fontFamily: "'Cormorant', Georgia, serif", fontWeight: 300 }}>
        <Link
          href={`/posts/${post.slug}`}
          className="hover:text-editorial-red transition-colors duration-200"
        >
          {post.title}
        </Link>
      </h2>

      {/* Excerpt */}
      {post.excerpt && (
        <p className="font-serif text-sm text-editorial-gray leading-relaxed line-clamp-2 mb-4">
          {post.excerpt}
        </p>
      )}

      {/* Byline */}
      <div className="flex items-center gap-2 font-sans text-[11px] text-editorial-gray mt-auto pt-3">
        {post.author && <span className="italic">By {post.author}</span>}
        {post.author && post.date && <span>&middot;</span>}
        {post.date && <span>{formatDate(post.date)}</span>}
      </div>
    </article>
  );
}
