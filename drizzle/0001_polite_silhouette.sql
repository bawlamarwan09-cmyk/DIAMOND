CREATE TABLE `catalog_products` (
	`id` text PRIMARY KEY NOT NULL,
	`collection_id` text NOT NULL,
	`slug` text NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`image_url` text NOT NULL,
	`price_aed` integer,
	`published` integer DEFAULT false NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`collection_id`) REFERENCES `collections`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_catalog_products_slug` ON `catalog_products` (`slug`);--> statement-breakpoint
CREATE INDEX `idx_catalog_products_collection_id` ON `catalog_products` (`collection_id`);--> statement-breakpoint
CREATE TABLE `collections` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`cover_image` text NOT NULL,
	`published` integer DEFAULT false NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_collections_slug` ON `collections` (`slug`);