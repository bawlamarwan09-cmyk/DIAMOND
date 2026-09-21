import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPost } from "../../blog-data";
import { EditorialShell } from "../../editorial-components";
import { brandName, siteUrl } from "../../site-config";

export const dynamic = "force-dynamic";
export const runtime = "edge";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug).catch(() => null);
  return post ? {
    title: `${post.title} | Lab Grant Diamond`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: "article", title: post.title, description: post.excerpt, url: `/blog/${post.slug}`, publishedTime: new Date(post.created_at).toISOString(), modifiedTime: new Date(post.updated_at).toISOString(), images: [post.cover_image] },
    twitter: { card: "summary_large_image", title: post.title, description: post.excerpt, images: [post.cover_image] },
  } : { title: "Article not found", robots: { index: false, follow: false } };
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug).catch(() => null);
  if (!post) notFound();
  const url = `${siteUrl}/blog/${post.slug}`;
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "Article", headline: post.title, description: post.excerpt, image: [new URL(post.cover_image, siteUrl).href], datePublished: new Date(post.created_at).toISOString(), dateModified: new Date(post.updated_at).toISOString(), author: { "@type": "Organization", name: brandName }, publisher: { "@type": "Organization", name: brandName }, mainEntityOfPage: url },
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteUrl }, { "@type": "ListItem", position: 2, name: "Journal", item: `${siteUrl}/blog` }, { "@type": "ListItem", position: 3, name: post.title, item: url }] },
  ] };
  const paragraphs = post.content.split(/\n\s*\n/).map(paragraph => paragraph.trim()).filter(Boolean);
  return <EditorialShell variant="theme-catalog"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} /><article className="blog-article"><header className="wrap blog-article-header"><Link prefetch={false} className="catalog-back" href="/blog">← THE JOURNAL</Link><p className="eyebrow">LAB GRANT DIAMOND · GUIDANCE</p><h1>{post.title}</h1><p>{post.excerpt}</p><time dateTime={new Date(post.created_at).toISOString()}>{new Date(post.created_at).toLocaleDateString("en-AE", { timeZone: "Asia/Dubai", day: "numeric", month: "long", year: "numeric" })} · 5 MIN READ</time></header><div className="blog-article-cover"><Image src={post.cover_image} alt="" width={1600} height={950} priority unoptimized={post.cover_image.startsWith("https://")} /></div><div className="wrap blog-article-body">{paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}<aside><p className="eyebrow">A PRIVATE CONVERSATION</p><h2>Looking for the right ring?</h2><p>Tell us what you have in mind and request a time to speak with us.</p><Link prefetch={false} href="/contact#book">BOOK AN APPOINTMENT ↗</Link></aside></div></article></EditorialShell>;
}
