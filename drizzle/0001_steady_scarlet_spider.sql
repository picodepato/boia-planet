CREATE TABLE `event_stamps` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`event_id` text NOT NULL,
	`source` text NOT NULL,
	`reference` text NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`owner`) REFERENCES `profiles`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `stamp_owner_event` ON `event_stamps` (`owner`,`event_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `stamp_reference` ON `event_stamps` (`reference`);--> statement-breakpoint
ALTER TABLE `profiles` ADD `answers` text DEFAULT '[]' NOT NULL;--> statement-breakpoint
ALTER TABLE `profiles` ADD `avatar` text DEFAULT 'coral' NOT NULL;--> statement-breakpoint
ALTER TABLE `profiles` ADD `mission` text DEFAULT 'lost' NOT NULL;--> statement-breakpoint
ALTER TABLE `profiles` ADD `sea_ledger` text DEFAULT '{}' NOT NULL;