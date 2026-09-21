import type { MetadataRoute } from "next";
import { siteUrl } from "./site-config";
import { listCollections, listProducts } from "./catalog-data";
import { listBlogPosts } from "./blog-data";

export const dynamic = "force-dynamic";
export const runtime = "edge";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages: MetadataRoute.Sitemap = [
    { url: siteUrl },
    { url: `${siteUrl}/collections` },
    { url: `${siteUrl}/blog` },
    { url: `${siteUrl}/product/solitaire-ring` },
    { url: `${siteUrl}/engagement-rings` },
    { url: `${siteUrl}/wedding-bands` },
    { url: `${siteUrl}/bridal-guide` },
    { url: `${siteUrl}/wedding-day` },
    { url: `${siteUrl}/diamond-guide` },
    { url: `${siteUrl}/our-craft` },
    { url: `${siteUrl}/bespoke` },
    { url: `${siteUrl}/about` },
    { url: `${siteUrl}/ring-care` },
    { url: `${siteUrl}/contact` },
  ];
  try {
    const [collections, products, posts] = await Promise.all([listCollections(true), listProducts(true), listBlogPosts(true)]);
    pages.push(...collections.map(item => ({ url: `${siteUrl}/collections/${item.slug}` })));
    pages.push(...products.map(item => ({ url: `${siteUrl}/product/${item.slug}` })));
    pages.push(...posts.map(item => ({ url: `${siteUrl}/blog/${item.slug}`, lastModified: new Date(item.updated_at) })));
  } catch (error) { console.error("Could not load catalogue sitemap", error); }
  return pages;
}
