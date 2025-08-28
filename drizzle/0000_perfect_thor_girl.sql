CREATE TABLE `3d-filament-profiles-test_filament` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(256) NOT NULL,
	`brand` text(128) NOT NULL,
	`material` text(128) NOT NULL,
	`color` text(64),
	`diameter` real NOT NULL,
	`weight` real,
	`remainingWeight` real,
	`price` real,
	`purchaseDate` integer,
	`nozzleTemp` integer,
	`bedTemp` integer,
	`printSpeed` integer,
	`retractionDistance` real,
	`retractionSpeed` real,
	`flowRate` real,
	`notes` text(1000),
	`isActive` integer DEFAULT true NOT NULL,
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	`updatedAt` integer
);
--> statement-breakpoint
CREATE INDEX `name_idx` ON `3d-filament-profiles-test_filament` (`name`);--> statement-breakpoint
CREATE INDEX `brand_idx` ON `3d-filament-profiles-test_filament` (`brand`);--> statement-breakpoint
CREATE INDEX `material_idx` ON `3d-filament-profiles-test_filament` (`material`);--> statement-breakpoint
CREATE INDEX `is_active_idx` ON `3d-filament-profiles-test_filament` (`isActive`);--> statement-breakpoint
CREATE TABLE `3d-filament-profiles-test_post` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(256),
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	`updatedAt` integer
);
--> statement-breakpoint
CREATE INDEX `name_idx` ON `3d-filament-profiles-test_post` (`name`);