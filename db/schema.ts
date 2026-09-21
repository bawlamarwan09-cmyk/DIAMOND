import { sqliteTable, integer, text, index, uniqueIndex } from "drizzle-orm/sqlite-core";

export const appointmentRequests = sqliteTable("appointment_requests", {
  id: text("id").primaryKey(),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  purpose: text("purpose").notNull(),
  preferredDate: text("preferred_date").notNull(),
  preferredTime: text("preferred_time").notNull(),
  meetingType: text("meeting_type").notNull(),
  notes: text("notes"),
  status: text("status").notNull().default("new"),
}, (table) => [index("idx_appointment_requests_created_at").on(table.createdAt)]);

export const collections = sqliteTable("collections", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  coverImage: text("cover_image").notNull(),
  published: integer("published", { mode: "boolean" }).notNull().default(false),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
}, table => [uniqueIndex("idx_collections_slug").on(table.slug)]);

export const catalogProducts = sqliteTable("catalog_products", {
  id: text("id").primaryKey(),
  collectionId: text("collection_id").notNull().references(() => collections.id),
  slug: text("slug").notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  priceAed: integer("price_aed"),
  published: integer("published", { mode: "boolean" }).notNull().default(false),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
}, table => [uniqueIndex("idx_catalog_products_slug").on(table.slug), index("idx_catalog_products_collection_id").on(table.collectionId)]);

export const blogPosts = sqliteTable("blog_posts", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  coverImage: text("cover_image").notNull(),
  published: integer("published", { mode: "boolean" }).notNull().default(false),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).notNull(),
}, table => [uniqueIndex("idx_blog_posts_slug").on(table.slug), index("idx_blog_posts_published_created_at").on(table.published, table.createdAt)]);
