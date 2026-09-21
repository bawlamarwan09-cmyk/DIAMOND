import { env } from "cloudflare:workers";

export type Collection = { id: string; slug: string; name: string; description: string; cover_image: string; published: number; created_at: number; product_count?: number };
export type CatalogProduct = { id: string; collection_id: string; collection_slug?: string; collection_name?: string; slug: string; name: string; description: string; image_url: string; price_aed: number | null; published: number; created_at: number };

export async function listCollections(publishedOnly = false): Promise<Collection[]> {
  if (!env.DB) throw new Error("Catalog storage is unavailable");
  const sql = `SELECT c.*, (SELECT COUNT(*) FROM catalog_products p WHERE p.collection_id = c.id${publishedOnly ? " AND p.published = 1" : ""}) AS product_count FROM collections c ${publishedOnly ? "WHERE c.published = 1" : ""} ORDER BY c.created_at DESC`;
  return (await env.DB.prepare(sql).all<Collection>()).results;
}

export async function listProducts(publishedOnly = false): Promise<CatalogProduct[]> {
  if (!env.DB) throw new Error("Catalog storage is unavailable");
  const sql = `SELECT p.*, c.slug AS collection_slug, c.name AS collection_name FROM catalog_products p JOIN collections c ON c.id = p.collection_id ${publishedOnly ? "WHERE p.published = 1 AND c.published = 1" : ""} ORDER BY p.created_at DESC`;
  return (await env.DB.prepare(sql).all<CatalogProduct>()).results;
}

export function safeImageUrl(value: string): boolean {
  if (value.startsWith("/media/")) return /^\/media\/[a-z0-9-]+\.webp$/.test(value);
  try { const url = new URL(value); return url.protocol === "https:" && !url.username && !url.password; } catch { return false; }
}
