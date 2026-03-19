import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getAllSlugs, getPostBySlug } from "@/lib/posts";
import PostHeader from "@/components/post/PostHeader";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllSlugs();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const post = getPostBySlug(params.slug);
    return {
      title: post.title,
      description: post.excerpt,
    };
  } catch {
    return { title: "Post Not Found" };
  }
}

export default function PostPage({ params }: PageProps) {
  let post;
  try {
    post = getPostBySlug(params.slug);
  } catch {
    notFound();
  }

  return (
    <article className="py-10">
      <PostHeader
        title={post.title}
        date={post.date}
        author={post.author}
        category={post.category}
        image={post.image}
      />

      {/* Body */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 mt-10">
        <div className="prose prose-lg max-w-none">
          <MDXRemote
            source={post.content}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
              },
            }}
          />
        </div>
      </div>
    </article>
  );
}
