import Link from "next/link";
import type { ReactNode } from "react";
import { requireCatalogOwner } from "./catalog-owner";

export const dynamic = "force-dynamic";
export const runtime = "edge";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const owner = await requireCatalogOwner("/dashboard/collections");
  if (!owner) return <main className="appointments-admin"><div className="wrap"><h1>Access restricted</h1><p>This page is for the Lab Grant Diamond owner.</p><Link href="/">Back to the website</Link></div></main>;
  return <main className="appointments-admin catalog-admin"><div className="wrap"><header className="appointments-admin-head"><Link href="/" className="wordmark"><span>LAB GRANT <span className="wordmark-diamond">DIAMOND</span></span><small>A BRIGHTER KIND OF FOREVER</small></Link><a href="/signout-with-chatgpt?return_to=%2F">SIGN OUT</a></header><nav className="catalog-admin-nav" aria-label="Dashboard"><Link href="/appointments">REQUESTS</Link><Link href="/dashboard/collections">COLLECTIONS</Link><Link href="/dashboard/products">PRODUCTS</Link><Link href="/dashboard/blog">BLOG</Link><a href="/" target="_blank" rel="noopener noreferrer">VIEW WEBSITE ↗</a></nav>{children}</div></main>;
}
