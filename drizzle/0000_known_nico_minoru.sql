CREATE TABLE `appointment_requests` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` integer NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`purpose` text NOT NULL,
	`preferred_date` text NOT NULL,
	`preferred_time` text NOT NULL,
	`meeting_type` text NOT NULL,
	`notes` text,
	`status` text DEFAULT 'new' NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_appointment_requests_created_at` ON `appointment_requests` (`created_at`);