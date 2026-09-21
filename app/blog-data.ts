import { env } from "cloudflare:workers";

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image: string;
  published: number;
  created_at: number;
  updated_at: number;
};

export async function listBlogPosts(publishedOnly = false): Promise<BlogPost[]> {
  if (!env.DB) throw new Error("Blog storage is unavailable");
  const where = publishedOnly ? "WHERE published = 1" : "";
  return (await env.DB.prepare(`SELECT * FROM blog_posts ${where} ORDER BY created_at DESC`).all<BlogPost>()).results;
}

export async function getBlogPost(slug: string, publishedOnly = true): Promise<BlogPost | null> {
  if (!env.DB) throw new Error("Blog storage is unavailable");
  const published = publishedOnly ? "AND published = 1" : "";
  return env.DB.prepare(`SELECT * FROM blog_posts WHERE slug = ? ${published}`).bind(slug).first<BlogPost>();
}
