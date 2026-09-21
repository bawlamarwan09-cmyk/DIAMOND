import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EditorialBreadcrumb, EditorialShell } from "../editorial-components";

export const metadata: Metadata = {
  title: "Privacy Information | Lab Grant Diamond",
  description: "How the current Lab Grant Diamond website handles browsing information, its ring preview and links to other services.",
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return <EditorialShell variant="theme-privacy">
    <EditorialBreadcrumb name="Privacy information" path="/privacy" />
    <div className="editorial-policy-hero"><div className="wrap"><p className="eyebrow">SITE INFORMATION</p><h1>Privacy, <em>clearly.</em></h1><p>How appointment requests and browsing information are handled on this website.</p></div></div>
    <section className="editorial-policy-body"><div className="wrap"><div className="editorial-policy-intro"><span>LAB GRANT DIAMOND · WEBSITE INFORMATION</span><p>The website provides information about Lab Grant Diamond and The Solitaire. Its bag is a design preview; it does not submit an order or take a payment.</p></div><div className="editorial-policy-row"><h2>Appointment requests</h2><p>If you request an appointment, we store the name, email, phone number, purpose, preferred date and time, meeting format and any notes you choose to provide. The site owner can view these details in a private requests page and use them to discuss and confirm an appointment with you. Submitting a request does not itself reserve a time.</p></div><div className="editorial-policy-row"><h2>Product selections</h2><p>If you choose a metal, size and quantity on The Solitaire page, those selections are used to display a bag preview during your visit. There is no payment form or newsletter sign-up on the site.</p></div><div className="editorial-policy-row"><h2>Technical information</h2><p>When a page is requested, the website’s hosting and delivery services may process standard connection data needed to serve and protect the site, such as an IP address, browser information and request time. The current site code does not include an advertising pixel or analytics integration.</p></div><div className="editorial-policy-row"><h2>Other websites and questions</h2><p>Some educational links lead to third-party websites with their own privacy terms. For questions about an appointment request, use the same conversation channel through which we contact you after your request.</p><Link className="editorial-dark-link" href="/contact">REQUEST AN APPOINTMENT <ArrowRight size={17} /></Link></div></div></section>
  </EditorialShell>;
}
