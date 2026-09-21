import type { Metadata } from "next";
import Link from "next/link";
import { env } from "cloudflare:workers";
import { requireChatGPTUser } from "../chatgpt-auth";
import RequestStatusButton from "./request-status-button";

export const dynamic = "force-dynamic";
export const runtime = "edge";
export const metadata: Metadata = { title: "Appointment Dashboard | Lab Grant Diamond", robots: { index: false, follow: false } };

type Appointment = { id: string; created_at: number; name: string; email: string; phone: string; purpose: string; preferred_date: string; preferred_time: string; meeting_type: string; notes: string | null; status: string };
type Counts = { total: number; new_count: number; upcoming: number };
const titles: Record<string, string> = { bespoke: "Bespoke ring", ring: "Choosing a ring", client: "Client request", other: "Other enquiry" };
const formats: Record<string, string> = { video: "Video call", phone: "Phone call", in_person: "In person" };
const times: Record<string, string> = { morning: "Morning", afternoon: "Afternoon", evening: "Evening" };

export default async function AppointmentsPage() {
  const user = await requireChatGPTUser("/appointments");
  if (user.email.toLowerCase() !== "bawlamarwan09@gmail.com") return <main className="appointments-admin"><div className="wrap"><h1>Access restricted</h1><p>This page is for the Lab Grant Diamond owner.</p><Link href="/">Back to the website</Link></div></main>;

  let appointments: Appointment[] = [];
  let counts: Counts = { total: 0, new_count: 0, upcoming: 0 };
  let unavailable = false;
  const todayInUae = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Dubai", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
  try {
    if (!env.DB) throw new Error("Appointment storage is unavailable");
    const [rows, totals] = await Promise.all([
      env.DB.prepare("SELECT id, created_at, name, email, phone, purpose, preferred_date, preferred_time, meeting_type, notes, status FROM appointment_requests ORDER BY created_at DESC LIMIT 100").all<Appointment>(),
      env.DB.prepare("SELECT COUNT(*) AS total, SUM(CASE WHEN status = 'new' THEN 1 ELSE 0 END) AS new_count, SUM(CASE WHEN status = 'new' AND preferred_date >= ? THEN 1 ELSE 0 END) AS upcoming FROM appointment_requests").bind(todayInUae).first<Counts>(),
    ]);
    appointments = rows.results;
    counts = { total: totals?.total ?? 0, new_count: totals?.new_count ?? 0, upcoming: totals?.upcoming ?? 0 };
  } catch (error) { console.error("Could not load appointment requests", error); unavailable = true; }

  return <main className="appointments-admin"><div className="wrap">
    <div className="appointments-admin-head"><Link href="/" className="wordmark"><span>LAB GRANT <span className="wordmark-diamond">DIAMOND</span></span><small>A BRIGHTER KIND OF FOREVER</small></Link><div className="appointments-admin-links"><a href="/" target="_blank" rel="noopener noreferrer">VIEW SITE</a><a href="/signout-with-chatgpt?return_to=%2F">SIGN OUT</a></div></div>
    <nav className="catalog-admin-nav" aria-label="Dashboard"><Link href="/appointments">REQUESTS</Link><Link href="/dashboard/collections">COLLECTIONS</Link><Link href="/dashboard/products">PRODUCTS</Link><Link href="/dashboard/blog">BLOG</Link></nav>
    <div className="appointments-heading"><div><p className="eyebrow">PRIVATE · LAB GRANT DIAMOND</p><h1>Appointment <em>dashboard.</em></h1><p>Review enquiries and follow up with each client to confirm a time.</p></div><span>UAE TIME · {todayInUae}</span></div>
    {unavailable ? <p className="appointments-empty" role="alert">Requests are temporarily unavailable. Please try again later.</p> : <>
      <section className="appointments-stats" aria-label="Request overview"><div><span>NEW REQUESTS</span><strong>{counts.new_count}</strong><small>Waiting for your reply</small></div><div><span>UPCOMING REQUESTS</span><strong>{counts.upcoming}</strong><small>New requests for today or later</small></div><div><span>ALL REQUESTS</span><strong>{counts.total}</strong><small>Received through the website</small></div></section>
      <section className="appointments-section" aria-labelledby="requests-title"><div className="appointments-section-head"><div><p className="eyebrow">YOUR INBOX</p><h2 id="requests-title">Recent requests</h2></div><span>{appointments.length < counts.total ? `Showing latest ${appointments.length} of ${counts.total}` : `${counts.total} total`}</span></div>
        {appointments.length === 0 ? <p className="appointments-empty">No requests yet. New appointment enquiries will appear here.</p> : <div className="appointments-list">{appointments.map(item => <article key={item.id}><div className="appointments-card-top"><span className={`appointments-status ${item.status === "contacted" ? "is-contacted" : ""}`}>{item.status === "contacted" ? "Contacted" : "New request"}</span><time dateTime={new Date(item.created_at).toISOString()}>{new Date(item.created_at).toLocaleDateString("en-AE", { timeZone: "Asia/Dubai", day: "numeric", month: "short", year: "numeric" })}</time></div><h3>{item.name}</h3><p className="appointments-purpose">{titles[item.purpose] ?? item.purpose}</p><p><strong>Preferred time</strong><br />{item.preferred_date} · {times[item.preferred_time] ?? item.preferred_time} (UAE) · {formats[item.meeting_type] ?? item.meeting_type}</p>{item.notes && <p className="appointments-notes">{item.notes}</p>}<div className="appointments-contact"><a href={`mailto:${item.email}`}>{item.email}</a><a href={`tel:${item.phone.replace(/[^\d+]/g, "")}`}>{item.phone}</a></div><RequestStatusButton id={item.id} status={item.status} /></article>)}</div>}
      </section>
    </>}
  </div></main>;
}
