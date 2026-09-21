import type { Metadata } from "next";
import Link from "next/link";
import { listBlogPosts, type BlogPost } from "../../blog-data";
import { requireCatalogOwner } from "../catalog-owner";
import BlogForm from "./blog-form";

export const dynamic = "force-dynamic";
export const runtime = "edge";
export const metadata: Metadata = { title: "Blog | Lab Grant Diamond Dashboard", robots: { index: false, follow: false } };

export default async function BlogDashboard() {
  if (!await requireCatalogOwner("/dashboard/blog")) return null;
  let posts: BlogPost[];
  try { posts = await listBlogPosts(); } catch (error) { console.error("Could not load blog posts", error); return <p role="alert" className="appointments-empty">Articles are temporarily unavailable.</p>; }
  return <div className="catalog-admin-content"><div className="catalog-admin-heading"><div><p className="eyebrow">CONTENT MANAGEMENT</p><h1>Blog.</h1><p>Publish useful guides that answer your clients’ questions and strengthen organic search visibility.</p></div><span>{posts.length} TOTAL</span></div>
    <section className="catalog-admin-panel blog-admin-panel"><h2>Add an article</h2><BlogForm /></section>
    <section className="catalog-admin-list"><h2>Your articles</h2>{posts.length === 0 ? <p className="appointments-empty">No articles yet. Write the first guide above.</p> : <div className="catalog-admin-items">{posts.map(post => <details key={post.id}><summary><span><b>{post.title}</b><small>/blog/{post.slug} · Updated {new Date(post.updated_at).toLocaleDateString("en-AE", { timeZone: "Asia/Dubai", day: "numeric", month: "short", year: "numeric" })}</small></span><span>{post.published ? "PUBLISHED" : "DRAFT"} · EDIT</span></summary><div className="catalog-admin-edit"><BlogForm post={post} />{post.published && <Link href={`/blog/${post.slug}`} target="_blank">Open public article ↗</Link>}</div></details>)}</div>}</section>
  </div>;
}
