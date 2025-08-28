DROP INDEX `name_idx`;--> statement-breakpoint
DROP INDEX `brand_idx`;--> statement-breakpoint
DROP INDEX `material_idx`;--> statement-breakpoint
DROP INDEX `is_active_idx`;--> statement-breakpoint
CREATE INDEX `filament_name_idx` ON `3d-filament-profiles-test_filament` (`name`);--> statement-breakpoint
CREATE INDEX `filament_brand_idx` ON `3d-filament-profiles-test_filament` (`brand`);--> statement-breakpoint
CREATE INDEX `filament_material_idx` ON `3d-filament-profiles-test_filament` (`material`);--> statement-breakpoint
CREATE INDEX `filament_is_active_idx` ON `3d-filament-profiles-test_filament` (`isActive`);--> statement-breakpoint
CREATE INDEX `post_name_idx` ON `3d-filament-profiles-test_post` (`name`);