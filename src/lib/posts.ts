import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Post } from "./types";

const postsDirectory = path.join(process.cwd(), "posts");

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) return [];

  const fileNames = fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".md"));

  const posts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      content,
      title: data.title ?? "",
      date: data.date ?? "",
      excerpt: data.excerpt ?? "",
      image: data.image ?? "",
      category: data.category ?? "",
      author: data.author ?? "",
    } as Post;
  });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    content,
    title: data.title ?? "",
    date: data.date ?? "",
    excerpt: data.excerpt ?? "",
    image: data.image ?? "",
    category: data.category ?? "",
    author: data.author ?? "",
  };
}

export function getAllSlugs(): { slug: string }[] {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs
    .readdirSync(postsDirectory)
    .filter((f) => f.endsWith(".md"))
    .map((f) => ({ slug: f.replace(/\.md$/, "") }));
}
