import { env } from "cloudflare:workers";
import { z } from "zod";
import { getChatGPTUser } from "../../chatgpt-auth";

export const runtime = "edge";

const requestSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().min(7).max(40),
  purpose: z.enum(["bespoke", "ring", "client", "other"]),
  preferredDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  preferredTime: z.enum(["morning", "afternoon", "evening"]),
  meetingType: z.enum(["video", "phone", "in_person"]),
  notes: z.string().trim().max(1500).optional(),
  website: z.string().optional(),
});

export async function POST(request: Request) {
  if (request.headers.get("origin") !== new URL(request.url).origin) return Response.json({ error: "Please submit this form from our website." }, { status: 403 });
  if (!request.headers.get("content-type")?.includes("application/json")) return Response.json({ error: "Invalid request." }, { status: 415 });
  if (Number(request.headers.get("content-length") || 0) > 8000) return Response.json({ error: "Your message is too long." }, { status: 413 });
  let body: unknown;
  try { body = await request.json(); } catch { return Response.json({ error: "Invalid request." }, { status: 400 }); }
  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) return Response.json({ error: "Please check your details and try again." }, { status: 400 });
  const data = parsed.data;
  if (data.website) return Response.json({ ok: true });
  const date = new Date(`${data.preferredDate}T00:00:00Z`);
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Dubai", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== data.preferredDate || data.preferredDate < today) return Response.json({ error: "Please choose a date from today onward." }, { status: 400 });
  try {
    if (!env.DB) throw new Error("Appointment storage is unavailable");
    await env.DB.prepare(`INSERT INTO appointment_requests (id, created_at, name, email, phone, purpose, preferred_date, preferred_time, meeting_type, notes, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'new')`)
      .bind(crypto.randomUUID(), Date.now(), data.name, data.email, data.phone, data.purpose, data.preferredDate, data.preferredTime, data.meetingType, data.notes || null).run();
    return Response.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("Appointment request could not be saved", error);
    return Response.json({ error: "We could not save your request right now. Please try again shortly." }, { status: 503 });
  }
}

export async function PATCH(request: Request) {
  const user = await getChatGPTUser();
  if (!user || user.email.toLowerCase() !== "bawlamarwan09@gmail.com") return Response.json({ error: "Access restricted." }, { status: 403 });
  if (request.headers.get("origin") !== new URL(request.url).origin) return Response.json({ error: "Invalid request origin." }, { status: 403 });
  if (!request.headers.get("content-type")?.includes("application/json")) return Response.json({ error: "Invalid request." }, { status: 415 });
  if (Number(request.headers.get("content-length") || 0) > 1000) return Response.json({ error: "Invalid request." }, { status: 413 });
  let body: unknown;
  try { body = await request.json(); } catch { return Response.json({ error: "Invalid request." }, { status: 400 }); }
  const parsed = z.object({ id: z.string().uuid(), status: z.enum(["new", "contacted"]) }).safeParse(body);
  if (!parsed.success) return Response.json({ error: "Invalid request." }, { status: 400 });
  try {
    if (!env.DB) throw new Error("Appointment storage is unavailable");
    const result = await env.DB.prepare("UPDATE appointment_requests SET status = ? WHERE id = ?").bind(parsed.data.status, parsed.data.id).run();
    if (!result.meta.changes) return Response.json({ error: "Request not found." }, { status: 404 });
    return Response.json({ ok: true });
  } catch (error) {
    console.error("Appointment status could not be updated", error);
    return Response.json({ error: "Could not update the request." }, { status: 503 });
  }
}
