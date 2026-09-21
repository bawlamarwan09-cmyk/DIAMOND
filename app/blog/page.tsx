import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { listBlogPosts, type BlogPost } from "../blog-data";
import { EditorialShell } from "../editorial-components";

export const dynamic = "force-dynamic";
export const runtime = "edge";
export const metadata: Metadata = {
  title: "Diamond & Wedding Ring Journal | Lab Grant Diamond",
  description: "Practical guidance on lab-grown diamonds, engagement rings, wedding bands and choosing a ring for your story.",
  alternates: { canonical: "/blog" },
  openGraph: { title: "The Journal | Lab Grant Diamond", description: "Guidance for choosing diamonds, engagement rings and wedding bands.", url: "/blog" },
};

export default async function BlogPage() {
  let posts: BlogPost[];
  try { posts = await listBlogPosts(true); } catch (error) { console.error("Could not load public blog", error); posts = []; }
  return <EditorialShell variant="theme-catalog"><div className="blog-public"><div className="wrap"><header className="blog-public-heading"><p className="eyebrow">THE LAB GRANT JOURNAL</p><h1>Stories, guidance<br /><em>and a little light.</em></h1><p>Thoughtful answers for choosing a diamond, finding the right ring and planning the moments around it.</p></header>{posts.length ? <div className="blog-public-grid">{posts.map((post, index) => <article className={index === 0 ? "blog-card blog-card-featured" : "blog-card"} key={post.id}><Link prefetch={false} href={`/blog/${post.slug}`} className="blog-card-image"><Image src={post.cover_image} alt="" width={1200} height={800} priority={index === 0} unoptimized={post.cover_image.startsWith("https://")} /></Link><div><p className="eyebrow">GUIDE · {new Date(post.created_at).toLocaleDateString("en-AE", { timeZone: "Asia/Dubai", month: "long", year: "numeric" }).toUpperCase()}</p><h2><Link prefetch={false} href={`/blog/${post.slug}`}>{post.title}</Link></h2><p>{post.excerpt}</p><Link prefetch={false} className="blog-read-link" href={`/blog/${post.slug}`}>READ ARTICLE ↗</Link></div></article>)}</div> : <div className="catalog-public-empty"><h2>The first story is being written.</h2><p>Our journal will soon share useful guidance about diamonds, rings and wedding moments.</p><Link prefetch={false} href="/diamond-guide">EXPLORE THE DIAMOND GUIDE ↗</Link></div>}</div></div></EditorialShell>;
}
