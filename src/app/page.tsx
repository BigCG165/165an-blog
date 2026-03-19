import { getAllPosts } from "@/lib/posts";
import FeaturedPost from "@/components/home/FeaturedPost";
import PostGrid from "@/components/home/PostGrid";

export default function HomePage() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      {/* Full-bleed featured post */}
      {featured && <FeaturedPost post={featured} />}

      {/* Rest of posts */}
      {rest.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-editorial-gray mb-10">
            More Stories
          </p>
          <PostGrid posts={rest} />
        </div>
      )}
    </>
  );
}
