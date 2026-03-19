import type { Post } from "@/lib/types";
import PostCard from "./PostCard";

interface PostGridProps {
  posts: Post[];
}

export default function PostGrid({ posts }: PostGridProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="font-serif text-editorial-gray text-lg">
          No posts yet. Add a <code>.md</code> file to the <code>/posts</code> folder to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
