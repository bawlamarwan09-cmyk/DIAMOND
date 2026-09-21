import type { Metadata } from "next";
import Link from "next/link";
import { listCollections, listProducts } from "../../catalog-data";
import { requireCatalogOwner } from "../catalog-owner";
import CatalogForm from "../catalog-form";

export const dynamic = "force-dynamic";
export const runtime = "edge";
export const metadata: Metadata = { title: "Products | Lab Grant Diamond Dashboard", robots: { index: false, follow: false } };

export default async function ProductsDashboard() {
  if (!await requireCatalogOwner("/dashboard/products")) return null;
  let collections, products;
  try { [collections, products] = await Promise.all([listCollections(), listProducts()]); } catch (error) { console.error("Could not load products", error); return <p role="alert" className="appointments-empty">Products are temporarily unavailable.</p>; }
  return <div className="catalog-admin-content"><div className="catalog-admin-heading"><div><p className="eyebrow">CATALOGUE MANAGEMENT</p><h1>Products.</h1><p>Add a ring to a collection, then publish it when its details and image are ready.</p></div><span>{products.length} TOTAL</span></div>
    {collections.length ? <section className="catalog-admin-panel"><h2>Add a product</h2><CatalogForm kind="product" collections={collections} /></section> : <div className="catalog-admin-panel"><p>Create a collection first, then you can add products to it.</p><Link href="/dashboard/collections">ADD A COLLECTION →</Link></div>}
    <section className="catalog-admin-list"><h2>Your products</h2>{products.length === 0 ? <p className="appointments-empty">No products yet. New designs will appear here.</p> : <div className="catalog-admin-items">{products.map(item => <details key={item.id}><summary><span><b>{item.name}</b><small>{item.collection_name} · /product/{item.slug}</small></span><span>{item.published ? "PUBLISHED" : "DRAFT"} · EDIT</span></summary><div className="catalog-admin-edit"><CatalogForm kind="product" item={item} collections={collections} /><Link href={`/product/${item.slug}`} target="_blank">Open public page ↗</Link></div></details>)}</div>}</section>
  </div>;
}
