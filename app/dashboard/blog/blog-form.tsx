"use client";

import { useState, type FormEvent } from "react";
import type { BlogPost } from "../../blog-data";

const toSlug = (title: string) => title.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 100);

export default function BlogForm({ post }: { post?: BlogPost }) {
  const editing = Boolean(post);
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true); setError("");
    const form = new FormData(event.currentTarget);
    const body = {
      ...(editing ? { id: post?.id } : { slug: slug.trim() }),
      title: title.trim(),
      excerpt: String(form.get("excerpt") ?? "").trim(),
      content: String(form.get("content") ?? "").trim(),
      coverImage: String(form.get("coverImage") ?? "").trim(),
      published: form.has("published"),
    };
    try {
      const response = await fetch("/api/blog", { method: editing ? "PATCH" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error ?? "Could not save this article.");
      window.location.reload();
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Could not save this article."); setSaving(false); }
  }

  return <form className="catalog-form blog-form" onSubmit={save}>
    <label>Article title <input required minLength={4} maxLength={160} value={title} onChange={event => { const previous = toSlug(title); const next = event.target.value; setTitle(next); if (!editing && (!slug || slug === previous)) setSlug(toSlug(next)); }} placeholder="E.g. How to choose an engagement ring" /></label>
    <label>URL slug <input required pattern="[a-z0-9]+(-[a-z0-9]+)*" maxLength={100} value={slug} onChange={event => setSlug(event.target.value)} disabled={editing} /></label>
    <label>Short description <textarea name="excerpt" required minLength={20} maxLength={320} rows={3} defaultValue={post?.excerpt ?? ""} placeholder="A concise summary shown on the blog and in search results" /></label>
    <label>Cover image URL <input name="coverImage" required maxLength={500} defaultValue={post?.cover_image ?? ""} placeholder="https://… or /media/wedding-hero.webp" /></label>
    <p className="catalog-form-hint">Use an HTTPS image URL, or an existing image from the website’s /media/ folder.</p>
    <label>Article content <textarea className="blog-content-input" name="content" required minLength={80} maxLength={30000} rows={16} defaultValue={post?.content ?? ""} placeholder={`Write the article in clear paragraphs.\n\nLeave an empty line between paragraphs.`} /></label>
    <label className="catalog-publish"><input name="published" type="checkbox" defaultChecked={Boolean(post?.published)} /> Publish this article</label>
    {error && <p className="catalog-form-error" role="alert">{error}</p>}
    <button type="submit" disabled={saving}>{saving ? "SAVING…" : editing ? "SAVE ARTICLE" : "ADD ARTICLE"}</button>
  </form>;
}
