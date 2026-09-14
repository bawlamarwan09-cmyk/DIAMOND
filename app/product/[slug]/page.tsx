import type { Metadata } from "next";
import ProductExperience from "../../product-experience";
import { brandName, siteUrl } from "../../site-config";

const productUrl = `${siteUrl}/product/solitaire-ring`;
const productDescription = "Explore The Solitaire, an oval lab-grown diamond engagement ring with a fine pavé band. View the setting, metal options and ring-size guide.";

export const metadata: Metadata = {
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

export function generateStaticParams() {
  return [{ slug: "solitaire-ring" }];
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema).replace(/</g, "\\u003c") }} />
    <ProductExperience slug={slug} />
  </>;
}
