PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_products` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`weight` integer NOT NULL,
	`price` real NOT NULL,
	`description` text NOT NULL,
	`category` text NOT NULL,
	`created_at` integer,
	`updated_at` integer,
	CONSTRAINT "category_check" CHECK("__new_products"."category" IN ('makanan_anjing', 'makanan_kucing', 'makanan_burung'))
);
--> statement-breakpoint
INSERT INTO `__new_products`("id", "title", "weight", "price", "description", "category", "created_at", "updated_at") SELECT "id", "title", "weight", "price", "description", "category", "created_at", "updated_at" FROM `products`;--> statement-breakpoint
DROP TABLE `products`;--> statement-breakpoint
ALTER TABLE `__new_products` RENAME TO `products`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `products_title_unique` ON `products` (`title`);