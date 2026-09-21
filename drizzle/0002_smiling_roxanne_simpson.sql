CREATE TABLE `blog_posts` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`title` text NOT NULL,
	`excerpt` text NOT NULL,
	`content` text NOT NULL,
	`cover_image` text NOT NULL,
	`published` integer DEFAULT false NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_blog_posts_slug` ON `blog_posts` (`slug`);--> statement-breakpoint
CREATE INDEX `idx_blog_posts_published_created_at` ON `blog_posts` (`published`,`created_at`);