import type { Metadata } from "next";
import Image from "next/image";
import AppointmentForm from "../appointment-form";
import { EditorialBreadcrumb, EditorialShell } from "../editorial-components";

export const metadata: Metadata = {
  title: "Book a Private Ring Consultation | Lab Grant Diamond UAE",
  description: "Request a private conversation with Lab Grant Diamond about a bespoke ring, choosing an engagement ring or a special client brief. Choose a preferred date and time in the UAE.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <EditorialShell variant="theme-contact theme-appointment">
    <EditorialBreadcrumb name="Book an appointment" path="/contact" />
    <section id="book" className="appointment-page"><div className="wrap appointment-layout"><div className="appointment-intro"><p className="eyebrow">A PRIVATE CONVERSATION</p><h1>Tell us about<br /><em>your forever.</em></h1><p>Planning a proposal, imagining a one-of-a-kind ring or sourcing something special for a client? Request a time to speak directly with Lab Grant Diamond.</p><div className="appointment-photo"><Image src="/media/wedding-hero.webp" alt="Couple sharing a quiet wedding moment" fill priority sizes="(max-width: 850px) 100vw, 42vw" /></div><span>PERSONAL STORIES · THOUGHTFUL DETAILS · YOUR MOMENT</span></div><div className="appointment-panel"><div className="appointment-panel-head"><p className="eyebrow">BOOK A CONVERSATION</p><h2>Let&apos;s find a<br /><em>time to talk.</em></h2><p>Share a preferred date and time. We will contact you to confirm the appointment.</p></div><AppointmentForm /></div></div></section>
  </EditorialShell>;
}
