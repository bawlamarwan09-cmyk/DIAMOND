import { env } from "cloudflare:workers";
import { z } from "zod";
import { getChatGPTUser } from "../../chatgpt-auth";
import { safeImageUrl } from "../../catalog-data";

export const runtime = "edge";

const slug = z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(90);
const image = z.string().trim().max(500).refine(safeImageUrl, "Use an HTTPS image URL or an existing /media/ image.");
const collectionFields = z.object({ name: z.string().trim().min(2).max(100), description: z.string().trim().min(10).max(800), coverImage: image, published: z.boolean() });
const productFields = z.object({ collectionId: z.string().uuid(), name: z.string().trim().min(2).max(120), description: z.string().trim().min(10).max(1500), imageUrl: image, priceAed: z.number().int().positive().max(10000000).nullable(), published: z.boolean() });
const create = z.discriminatedUnion("kind", [collectionFields.extend({ kind: z.literal("collection"), slug }), productFields.extend({ kind: z.literal("product"), slug })]);
const update = z.discriminatedUnion("kind", [collectionFields.extend({ kind: z.literal("collection"), id: z.string().uuid() }), productFields.extend({ kind: z.literal("product"), id: z.string().uuid() })]);

async function handle(request: Request, isUpdate: boolean) {
  const user = await getChatGPTUser();
  if (!user || user.email.toLowerCase() !== "bawlamarwan09@gmail.com") return Response.json({ error: "Access restricted." }, { status: 403 });
  if (request.headers.get("origin") !== new URL(request.url).origin) return Response.json({ error: "Invalid request origin." }, { status: 403 });
  if (!request.headers.get("content-type")?.includes("application/json")) return Response.json({ error: "Invalid request." }, { status: 415 });
  if (Number(request.headers.get("content-length") || 0) > 6000) return Response.json({ error: "Request is too long." }, { status: 413 });
  let body: unknown;
  try { body = await request.json(); } catch { return Response.json({ error: "Invalid request." }, { status: 400 }); }
  const parsed = isUpdate ? update.safeParse(body) : create.safeParse(body);
  if (!parsed.success) return Response.json({ error: parsed.error.issues[0]?.message ?? "Check the form fields." }, { status: 400 });
  const data = parsed.data;
  if (data.kind === "product" && !isUpdate && "slug" in data && data.slug === "solitaire-ring") return Response.json({ error: "This address is reserved for The Solitaire." }, { status: 409 });
  try {
    if (!env.DB) throw new Error("Catalog storage is unavailable");
    const createdId = isUpdate ? null : crypto.randomUUID();
    if (data.kind === "product") {
      const parent = await env.DB.prepare("SELECT id FROM collections WHERE id = ?").bind(data.collectionId).first();
      if (!parent) return Response.json({ error: "Choose an existing collection." }, { status: 400 });
    }
    const result = isUpdate
      ? data.kind === "collection"
        ? await env.DB.prepare("UPDATE collections SET name = ?, description = ?, cover_image = ?, published = ? WHERE id = ?").bind(data.name, data.description, data.coverImage, Number(data.published), "id" in data ? data.id : "").run()
        : await env.DB.prepare("UPDATE catalog_products SET collection_id = ?, name = ?, description = ?, image_url = ?, price_aed = ?, published = ? WHERE id = ?").bind(data.collectionId, data.name, data.description, data.imageUrl, data.priceAed, Number(data.published), "id" in data ? data.id : "").run()
      : data.kind === "collection"
        ? await env.DB.prepare("INSERT INTO collections (id, slug, name, description, cover_image, published, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(createdId, "slug" in data ? data.slug : "", data.name, data.description, data.coverImage, Number(data.published), Date.now()).run()
        : await env.DB.prepare("INSERT INTO catalog_products (id, collection_id, slug, name, description, image_url, price_aed, published, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)").bind(createdId, data.collectionId, "slug" in data ? data.slug : "", data.name, data.description, data.imageUrl, data.priceAed, Number(data.published), Date.now()).run();
    if (isUpdate && !result.meta.changes) return Response.json({ error: "Item not found." }, { status: 404 });
    return Response.json({ ok: true, id: createdId ?? ("id" in data ? data.id : null) }, { status: isUpdate ? 200 : 201 });
  } catch (error) {
    if (error instanceof Error && /UNIQUE constraint failed/i.test(error.message)) return Response.json({ error: "That URL slug is already in use." }, { status: 409 });
    console.error("Catalog could not be saved", error);
    return Response.json({ error: "Could not save this item. Try again." }, { status: 503 });
  }
}

export async function POST(request: Request) { return handle(request, false); }
export async function PATCH(request: Request) { return handle(request, true); }
