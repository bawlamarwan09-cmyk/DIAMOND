import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { env } from "cloudflare:workers";
import { type Collection, type CatalogProduct } from "../../catalog-data";
import { EditorialShell } from "../../editorial-components";

export const dynamic = "force-dynamic";
export const runtime = "edge";

async function getCollection(slug: string) {
  if (!env.DB) throw new Error("Catalog storage is unavailable");
  const collection = await env.DB.prepare("SELECT * FROM collections WHERE slug = ? AND published = 1").bind(slug).first<Collection>();
  if (!collection) return null;
  const products = (await env.DB.prepare("SELECT * FROM catalog_products WHERE collection_id = ? AND published = 1 ORDER BY created_at DESC").bind(collection.id).all<CatalogProduct>()).results;
  return { collection, products };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = await getCollection(slug).catch(() => null);
  return data ? { title: `${data.collection.name} | Lab Grant Diamond`, description: data.collection.description, alternates: { canonical: `/collections/${slug}` }, openGraph: { images: [data.collection.cover_image] } } : { title: "Collection not found", robots: { index: false } };
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getCollection(slug).catch(() => null);
  if (!data) notFound();
  const { collection, products } = data;
  return <EditorialShell variant="theme-catalog"><div className="catalog-public"><div className="wrap"><header className="catalog-public-heading"><Link className="catalog-back" href="/collections">← ALL COLLECTIONS</Link><p className="eyebrow">LAB GRANT DIAMOND · THE COLLECTIONS</p><h1>{collection.name}</h1><p>{collection.description}</p></header>{products.length ? <div className="catalog-public-grid">{products.map(item => <a className="catalog-public-card" key={item.id} href={`/product/${item.slug}`}><span className="catalog-public-image"><Image src={item.image_url} alt={item.name} width={900} height={1000} unoptimized={item.image_url.startsWith("https://")} /></span><span className="eyebrow">{collection.name.toUpperCase()}</span><strong>{item.name}</strong><span>{item.price_aed ? `AED ${item.price_aed.toLocaleString("en-AE")}` : "Price on request"}</span><span className="catalog-public-action">VIEW THE RING ↗</span></a>)}</div> : <div className="catalog-public-empty"><h2>More to come.</h2><p>This collection is ready. Its first rings will be added soon.</p><Link href="/collections">EXPLORE ALL COLLECTIONS ↗</Link></div>}</div></div></EditorialShell>;
}
