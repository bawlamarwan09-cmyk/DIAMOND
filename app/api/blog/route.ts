import { env } from "cloudflare:workers";
import { z } from "zod";
import { getChatGPTUser } from "../../chatgpt-auth";
import { safeImageUrl } from "../../catalog-data";

export const runtime = "edge";

const slug = z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and hyphens only.").max(100);
const fields = z.object({
  title: z.string().trim().min(4).max(160),
  excerpt: z.string().trim().min(20).max(320),
  content: z.string().trim().min(80).max(30000),
  coverImage: z.string().trim().max(500).refine(safeImageUrl, "Use an HTTPS image URL or an existing /media/ image."),
  published: z.boolean(),
});
const createPost = fields.extend({ slug });
const updatePost = fields.extend({ id: z.string().uuid() });

async function requireOwner(request: Request) {
  const user = await getChatGPTUser();
  if (!user || user.email.toLowerCase() !== "bawlamarwan09@gmail.com") return Response.json({ error: "Access restricted." }, { status: 403 });
  if (request.headers.get("origin") !== new URL(request.url).origin) return Response.json({ error: "Invalid request origin." }, { status: 403 });
  return null;
}

async function handle(request: Request, editing: boolean) {
  const denied = await requireOwner(request);
  if (denied) return denied;
  if (!request.headers.get("content-type")?.includes("application/json")) return Response.json({ error: "Invalid request." }, { status: 415 });
  if (Number(request.headers.get("content-length") || 0) > 35000) return Response.json({ error: "Article is too long." }, { status: 413 });
  let body: unknown;
  try { body = await request.json(); } catch { return Response.json({ error: "Invalid request." }, { status: 400 }); }
  const parsed = editing ? updatePost.safeParse(body) : createPost.safeParse(body);
  if (!parsed.success) return Response.json({ error: parsed.error.issues[0]?.message ?? "Check the article fields." }, { status: 400 });
  const data = parsed.data;
  try {
    if (!env.DB) throw new Error("Blog storage is unavailable");
    const now = Date.now();
    const id = editing ? null : crypto.randomUUID();
    const result = editing
      ? await env.DB.prepare("UPDATE blog_posts SET title = ?, excerpt = ?, content = ?, cover_image = ?, published = ?, updated_at = ? WHERE id = ?").bind(data.title, data.excerpt, data.content, data.coverImage, Number(data.published), now, "id" in data ? data.id : "").run()
      : await env.DB.prepare("INSERT INTO blog_posts (id, slug, title, excerpt, content, cover_image, published, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)").bind(id, "slug" in data ? data.slug : "", data.title, data.excerpt, data.content, data.coverImage, Number(data.published), now, now).run();
    if (editing && !result.meta.changes) return Response.json({ error: "Article not found." }, { status: 404 });
    return Response.json({ ok: true, id: id ?? ("id" in data ? data.id : null) }, { status: editing ? 200 : 201 });
  } catch (error) {
    if (error instanceof Error && /UNIQUE constraint failed/i.test(error.message)) return Response.json({ error: "That article URL is already in use." }, { status: 409 });
    console.error("Blog article could not be saved", error);
    return Response.json({ error: "Could not save this article. Try again." }, { status: 503 });
  }
}

export async function POST(request: Request) { return handle(request, false); }
export async function PATCH(request: Request) { return handle(request, true); }
