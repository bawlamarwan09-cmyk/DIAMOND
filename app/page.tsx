import DiamondExperience from "./diamond-experience";
import { brandName, siteUrl } from "./site-config";

const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", "@id": `${siteUrl}/#organization`, name: brandName, url: siteUrl, logo: `${siteUrl}/favicon.svg` },
    { "@type": "WebSite", "@id": `${siteUrl}/#website`, name: brandName, url: siteUrl, publisher: { "@id": `${siteUrl}/#organization` }, inLanguage: "en" },
  ],
};

export default function Home() {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema).replace(/</g, "\\u003c") }} />
    <DiamondExperience />
  </>;
}
