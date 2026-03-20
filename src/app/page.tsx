import { getAllPosts } from "@/lib/posts";
import FeaturedPost from "@/components/home/FeaturedPost";
import PostGrid from "@/components/home/PostGrid";
import ListeningSection from "@/components/home/ListeningSection";

export default function HomePage() {
  const posts = getAllPosts();
  const featured = posts[0];

  return (
    <>
      {/* Full-bleed featured post */}
      {featured && <FeaturedPost post={featured} />}

      {/* Alla inlägg */}
      <section id="las-mer" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
        <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-editorial-gray mb-10">
          Läs mer
        </p>
        <PostGrid posts={posts} />
      </section>

      {/* Spotify */}
      <ListeningSection />
    </>
  );
}
