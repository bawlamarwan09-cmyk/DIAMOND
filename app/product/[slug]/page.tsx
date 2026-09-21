import type { Metadata } from "next";
import ProductExperience from "../../product-experience";
import Image from "next/image";
import { brandName, siteUrl } from "../../site-config";
import { env } from "cloudflare:workers";
import { notFound } from "next/navigation";
import { EditorialShell } from "../../editorial-components";
import type { CatalogProduct } from "../../catalog-data";

export const dynamic = "force-dynamic";
export const runtime = "edge";

const productUrl = `${siteUrl}/product/solitaire-ring`;
const productDescription = "Explore The Solitaire, an oval lab-grown diamond engagement ring with a fine pavé band. View the setting, metal options and ring-size guide.";

const solitaireMetadata: Metadata = {
  title: "The Solitaire Oval Lab-Grown Diamond Ring | Lab Grant Diamond",
  description: productDescription,
  alternates: { canonical: productUrl },
  openGraph: {
    type: "website",
    siteName: brandName,
    locale: "en_AE",
    url: productUrl,
    title: "The Solitaire Oval Lab-Grown Diamond Ring | Lab Grant Diamond",
    description: productDescription,
    images: [{ url: "/media/solitaire.webp", width: 730, height: 690, alt: "The Solitaire lab-grown diamond engagement ring" }],
  },
  twitter: { card: "summary_large_image" },
};

const productSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Product",
      "@id": `${productUrl}#product`,
      name: "The Solitaire",
      description: productDescription,
      sku: "LGD-001",
      category: "Lab-grown diamond engagement rings",
      image: [`${siteUrl}/media/solitaire.webp`],
      brand: { "@type": "Brand", name: brandName },
      url: productUrl,
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "The Solitaire", item: productUrl },
      ],
    },
  ],
};

async function getCatalogProduct(slug: string) {
  if (!env.DB) throw new Error("Catalog storage is unavailable");
  return env.DB.prepare("SELECT p.*, c.name AS collection_name, c.slug AS collection_slug FROM catalog_products p JOIN collections c ON c.id = p.collection_id WHERE p.slug = ? AND p.published = 1 AND c.published = 1").bind(slug).first<CatalogProduct>();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (slug === "solitaire-ring") return solitaireMetadata;
  const product = await getCatalogProduct(slug).catch(() => null);
  return product ? { title: `${product.name} | Lab Grant Diamond`, description: product.description, alternates: { canonical: `/product/${slug}` }, openGraph: { images: [product.image_url] } } : { title: "Ring not found", robots: { index: false } };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug !== "solitaire-ring") {
    const product = await getCatalogProduct(slug).catch(() => null);
    if (!product) notFound();
    const url = `${siteUrl}/product/${product.slug}`;
    const schema = { "@context": "https://schema.org", "@type": "Product", name: product.name, description: product.description, image: [new URL(product.image_url, siteUrl).href], brand: { "@type": "Brand", name: brandName }, url };
    return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} /><EditorialShell><div className="catalog-public catalog-product"><div className="wrap"><a className="catalog-back" href={`/collections/${product.collection_slug}`}>← {product.collection_name?.toUpperCase()}</a><div className="catalog-product-grid"><div className="catalog-product-image"><Image src={product.image_url} alt={product.name} width={1100} height={1100} priority unoptimized={product.image_url.startsWith("https://")} /></div><div className="catalog-product-copy"><p className="eyebrow">{product.collection_name?.toUpperCase()} · LAB GRANT DIAMOND</p><h1>{product.name}</h1><p className="catalog-product-price">{product.price_aed ? `AED ${product.price_aed.toLocaleString("en-AE")}` : "Price on request"}</p><p className="catalog-product-description">{product.description}</p><a className="catalog-product-cta" href="/contact#book">ENQUIRE ABOUT THIS RING ↗</a><p className="catalog-product-note">Talk to us about details and availability before making a decision.</p></div></div></div></div></EditorialShell></>;
  }
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema).replace(/</g, "\\u003c") }} />
    <ProductExperience slug={slug} />
  </>;
}
