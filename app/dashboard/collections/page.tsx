import type { Metadata } from "next";
import Link from "next/link";
import { listCollections } from "../../catalog-data";
import { requireCatalogOwner } from "../catalog-owner";
import CatalogForm from "../catalog-form";

export const dynamic = "force-dynamic";
export const runtime = "edge";
export const metadata: Metadata = { title: "Collections | Lab Grant Diamond Dashboard", robots: { index: false, follow: false } };

export default async function CollectionsDashboard() {
  if (!await requireCatalogOwner("/dashboard/collections")) return null;
  let collections;
  try { collections = await listCollections(); } catch (error) { console.error("Could not load collections", error); return <p role="alert" className="appointments-empty">Collections are temporarily unavailable.</p>; }
  return <div className="catalog-admin-content"><div className="catalog-admin-heading"><div><p className="eyebrow">CATALOGUE MANAGEMENT</p><h1>Collections.</h1><p>Group your rings by story or style. Add a collection before adding its products.</p></div><span>{collections.length} TOTAL</span></div>
    <section className="catalog-admin-panel"><h2>Add a collection</h2><CatalogForm kind="collection" /></section>
    <section className="catalog-admin-list"><h2>Your collections</h2>{collections.length === 0 ? <p className="appointments-empty">No collections yet. Create one above to begin.</p> : <div className="catalog-admin-items">{collections.map(item => <details key={item.id}><summary><span><b>{item.name}</b><small>/{item.slug} · {item.product_count ?? 0} products</small></span><span>{item.published ? "LIVE" : "DRAFT"} · EDIT</span></summary><div className="catalog-admin-edit"><CatalogForm kind="collection" item={item} /><Link href={`/collections/${item.slug}`} target="_blank">Open public page ↗</Link></div></details>)}</div>}</section>
  </div>;
}
