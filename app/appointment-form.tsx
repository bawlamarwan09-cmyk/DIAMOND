"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";

const purposes = [
  ["bespoke", "A ring made just for me"],
  ["ring", "Help choosing a ring"],
  ["client", "A special request for my client"],
  ["other", "Something else"],
] as const;

export default function AppointmentForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");
  const todayInUae = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Dubai", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending") return;
    setState("sending"); setError("");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      const response = await fetch("/api/appointments", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const result = await response.json().catch(() => ({})) as { error?: string };
        throw new Error(typeof result.error === "string" ? result.error : "We could not save your request. Please try again.");
      }
      setState("sent"); form.reset();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "We could not save your request. Please try again.");
      setState("idle");
    }
  }

  if (state === "sent") return <div className="appointment-success" role="status"><Check size={30} /><p className="eyebrow">REQUEST RECEIVED</p><h2>We have your<br /><em>preferred time.</em></h2><p>Thank you for telling us what you have in mind. This is a request, not a confirmed appointment. We will use the contact details you provided to discuss availability.</p><button type="button" onClick={() => setState("idle")}>SEND ANOTHER REQUEST <ArrowRight size={17} /></button></div>;

  return <form className="appointment-form" onSubmit={submit} aria-label="Request a private appointment">
    <div className="appointment-fields">
      <label>Your name <input name="name" type="text" autoComplete="name" required maxLength={100} placeholder="Full name" /></label>
      <label>Email <input name="email" type="email" autoComplete="email" required maxLength={200} placeholder="you@example.com" /></label>
      <label>Phone or WhatsApp <input name="phone" type="tel" autoComplete="tel" required maxLength={40} placeholder="Include country code" /></label>
      <label>What would you like to discuss? <select name="purpose" required defaultValue=""><option value="" disabled>Choose a reason</option>{purposes.map(([value, title]) => <option value={value} key={value}>{title}</option>)}</select></label>
      <label>Preferred date <input name="preferredDate" type="date" required min={todayInUae} /></label>
      <label>Preferred time (UAE) <select name="preferredTime" required defaultValue=""><option value="" disabled>Choose a time of day</option><option value="morning">Morning · 9am–12pm</option><option value="afternoon">Afternoon · 12pm–5pm</option><option value="evening">Evening · after 5pm</option></select></label>
      <label>How would you like to meet? <select name="meetingType" required defaultValue=""><option value="" disabled>Choose a format</option><option value="video">Video call</option><option value="phone">Phone call</option><option value="in_person">In person, if available</option></select></label>
      <label className="appointment-notes">Tell us about your idea <textarea name="notes" rows={4} maxLength={1500} placeholder="A ring design, occasion, client brief, or anything you would like us to know" /></label>
      <label className="appointment-honeypot" aria-hidden="true">Website <input name="website" tabIndex={-1} autoComplete="off" /></label>
    </div>
    <p className="appointment-fine-print">Your preferred date and time are subject to confirmation. We will use your details only to discuss your request. See our <a href="/privacy">privacy information</a>.</p>
    {error && <p className="appointment-error" role="alert">{error}</p>}
    <button className="appointment-submit" type="submit" disabled={state === "sending"}>{state === "sending" ? "SENDING REQUEST…" : "REQUEST AN APPOINTMENT"}<ArrowRight size={18} /></button>
  </form>;
}
