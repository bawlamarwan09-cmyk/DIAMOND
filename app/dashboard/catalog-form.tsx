"use client";

import { useState, type FormEvent } from "react";
import type { CatalogProduct, Collection } from "../catalog-data";

type Props = { kind: "collection"; item?: Collection } | { kind: "product"; item?: CatalogProduct; collections: Collection[] };
const toSlug = (name: string) => name.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 90);

export default function CatalogForm(props: Props) {
  const [name, setName] = useState(props.item?.name ?? "");
  const [slug, setSlug] = useState(props.item?.slug ?? "");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const editing = Boolean(props.item);
  const imageValue = props.kind === "collection" ? props.item?.cover_image : props.item?.image_url;

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true); setError("");
    const form = new FormData(event.currentTarget);
    const body = props.kind === "collection"
      ? { kind: "collection", ...(editing ? { id: props.item?.id } : { slug: slug.trim() }), name: name.trim(), description: String(form.get("description") ?? "").trim(), coverImage: String(form.get("image") ?? "").trim(), published: form.has("published") }
      : { kind: "product", ...(editing ? { id: props.item?.id } : { slug: slug.trim() }), collectionId: String(form.get("collectionId") ?? ""), name: name.trim(), description: String(form.get("description") ?? "").trim(), imageUrl: String(form.get("image") ?? "").trim(), priceAed: form.get("priceAed") ? Number(form.get("priceAed")) : null, published: form.has("published") };
    try {
      const response = await fetch("/api/catalog", { method: editing ? "PATCH" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error ?? "Could not save this item.");
      window.location.reload();
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Could not save this item."); setSaving(false); }
  }

  return <form className="catalog-form" onSubmit={save}>
    <label>Name <input required minLength={2} maxLength={120} value={name} onChange={event => { const previous = toSlug(name); const next = event.target.value; setName(next); if (!editing && (!slug || slug === previous)) setSlug(toSlug(next)); }} placeholder={props.kind === "collection" ? "E.g. Wedding Bands" : "E.g. The Aurora Ring"} /></label>
    <label>URL slug <input required pattern="[a-z0-9]+(-[a-z0-9]+)*" maxLength={90} value={slug} onChange={event => setSlug(event.target.value)} disabled={editing} aria-describedby={editing ? undefined : "catalog-slug-help"} /></label>
    {!editing && <small id="catalog-slug-help">Used in the public page address. Choose it before saving.</small>}
    {props.kind === "product" && <label>Collection <select name="collectionId" required defaultValue={props.item?.collection_id ?? ""}><option value="" disabled>Choose a collection</option>{props.collections.map(collection => <option key={collection.id} value={collection.id}>{collection.name}{collection.published ? "" : " (draft)"}</option>)}</select></label>}
    <label>Description <textarea name="description" required minLength={10} maxLength={props.kind === "collection" ? 800 : 1500} rows={4} defaultValue={props.item?.description ?? ""} placeholder="A few words about this design" /></label>
    <label>Image URL <input name="image" type="text" required maxLength={500} defaultValue={imageValue ?? ""} placeholder="https://… or /media/solitaire.webp" /></label>
    <p className="catalog-form-hint">Paste an HTTPS image URL, or use an image already in this website’s /media/ folder.</p>
    {props.kind === "product" && <label>Price in AED (optional) <input name="priceAed" type="number" min={1} max={10000000} step={1} defaultValue={props.item?.price_aed ?? ""} placeholder="Leave empty for price on request" /></label>}
    <label className="catalog-publish"><input name="published" type="checkbox" defaultChecked={Boolean(props.item?.published)} /> Publish on the website</label>
    {props.kind === "product" && <p className="catalog-form-hint">A product appears publicly only when its collection is also published.</p>}
    {error && <p className="catalog-form-error" role="alert">{error}</p>}
    <button type="submit" disabled={saving}>{saving ? "SAVING…" : editing ? "SAVE CHANGES" : `ADD ${props.kind.toUpperCase()}`}</button>
  </form>;
}
