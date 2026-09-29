CREATE TABLE `bottles` (
	`owner` text PRIMARY KEY NOT NULL,
	`id` text NOT NULL,
	`body` text NOT NULL,
	`x` real NOT NULL,
	`z` real NOT NULL,
	`hidden` integer DEFAULT 0 NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`owner`) REFERENCES `profiles`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `bottles_id` ON `bottles` (`id`);--> statement-breakpoint
CREATE TABLE `profiles` (
	`id` text PRIMARY KEY NOT NULL,
	`nickname` text NOT NULL,
	`genres` text DEFAULT '' NOT NULL,
	`artist` text DEFAULT '' NOT NULL,
	`memory` text DEFAULT '' NOT NULL,
	`message` text DEFAULT '' NOT NULL,
	`survey` text,
	`color` text DEFAULT '#ff622e' NOT NULL,
	`flag` integer DEFAULT 0 NOT NULL,
	`trail` integer DEFAULT 0 NOT NULL,
	`model` text DEFAULT 'classic' NOT NULL,
	`accessory` integer DEFAULT 0 NOT NULL,
	`owned` text DEFAULT '[]' NOT NULL,
	`rewards` text DEFAULT '[]' NOT NULL,
	`discovered` text DEFAULT '[]' NOT NULL,
	`points` integer DEFAULT 0 NOT NULL,
	`coins` integer DEFAULT 0 NOT NULL,
	`active_seconds` real DEFAULT 0 NOT NULL,
	`public_id` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `profiles_public_id` ON `profiles` (`public_id`);--> statement-breakpoint
CREATE INDEX `profiles_points` ON `profiles` (`points`);--> statement-breakpoint
CREATE TABLE `bottle_reports` (
	`id` text PRIMARY KEY NOT NULL,
	`bottle_id` text NOT NULL,
	`reporter` text NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `report_unique` ON `bottle_reports` (`bottle_id`,`reporter`);--> statement-breakpoint
CREATE TABLE `race_runs` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`created_at` integer NOT NULL,
	`completed_at` integer,
	`time_ms` integer,
	`penalties` integer DEFAULT 0 NOT NULL,
	`version` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `runs_owner_time` ON `race_runs` (`owner`,`time_ms`);