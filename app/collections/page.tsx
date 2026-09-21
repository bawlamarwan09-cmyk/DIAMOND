import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { listCollections, type Collection } from "../catalog-data";
import { EditorialShell } from "../editorial-components";

export const dynamic = "force-dynamic";
export const runtime = "edge";
export const metadata: Metadata = { title: "Diamond Ring Collections | Lab Grant Diamond", description: "Explore the latest Lab Grant Diamond ring collections and find a design for your story.", alternates: { canonical: "/collections" } };

export default async function CollectionsPage() {
  let collections: Collection[];
  try { collections = await listCollections(true); } catch (error) { console.error("Could not load public collections", error); collections = []; }
  return <EditorialShell variant="theme-catalog"><div className="catalog-public"><div className="wrap"><header className="catalog-public-heading"><p className="eyebrow">LAB GRANT DIAMOND · THE COLLECTIONS</p><h1>Find the one<br /><em>that feels yours.</em></h1><p>Explore our published collections and the rings within them.</p></header>{collections.length ? <div className="catalog-public-grid">{collections.map(item => <a className="catalog-public-card" key={item.id} href={`/collections/${item.slug}`}><span className="catalog-public-image"><Image src={item.cover_image} alt={item.name} width={900} height={1000} unoptimized={item.cover_image.startsWith("https://")} /></span><span className="eyebrow">{item.product_count} {item.product_count === 1 ? "RING" : "RINGS"}</span><strong>{item.name}</strong><span>{item.description}</span><span className="catalog-public-action">EXPLORE COLLECTION ↗</span></a>)}</div> : <div className="catalog-public-empty"><h2>Something beautiful is coming.</h2><p>Our collections are being prepared. In the meantime, discover The Solitaire.</p><Link href="/product/solitaire-ring">VIEW THE SOLITAIRE ↗</Link></div>}</div></div></EditorialShell>;
}
