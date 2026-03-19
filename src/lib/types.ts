export interface FrontMatter {
  title: string;
  date: string;
  excerpt: string;
  image: string;
  category: string;
  author: string;
}

export interface Post extends FrontMatter {
  slug: string;
  content: string;
}
