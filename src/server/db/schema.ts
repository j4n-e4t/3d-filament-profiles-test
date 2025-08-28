// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import { index, pgTableCreator } from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `${name}`);

export const filaments = createTable(
  "filament",
  (d) => ({
    id: d.serial("id").primaryKey(),
    brand: d.varchar("brand", { length: 128 }).notNull(),
    material: d.varchar("material", { length: 128 }).notNull(), // PLA, ABS, PETG, etc.
    color: d.varchar("color", { length: 64 }),
    hexColor: d.varchar("hex_color", { length: 7 }), // RGB hex color (e.g., #FF0000)
    diameter: d.numeric("diameter", { precision: 4, scale: 2 }).notNull(), // 1.75mm or 2.85mm
    weight: d.numeric("weight", { precision: 8, scale: 2 }), // in grams
    remainingWeight: d.numeric("remaining_weight", { precision: 8, scale: 2 }), // remaining weight in grams
    price: d.numeric("price", { precision: 8, scale: 2 }), // price per kg
    purchaseDate: d.timestamp("purchase_date"),
    nozzleTemp: d.integer("nozzle_temp"), // recommended nozzle temperature
    bedTemp: d.integer("bed_temp"), // recommended bed temperature
    printSpeed: d.integer("print_speed"), // recommended print speed in mm/s
    retractionDistance: d.numeric("retraction_distance", {
      precision: 4,
      scale: 2,
    }), // retraction distance in mm
    retractionSpeed: d.numeric("retraction_speed", { precision: 4, scale: 2 }), // retraction speed in mm/s
    flowRate: d.numeric("flow_rate", { precision: 4, scale: 3 }), // flow rate multiplier (default 1.0)
    notes: d.text("notes"),
    isActive: d.boolean("is_active").default(true).notNull(),
    createdAt: d
      .timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: d.timestamp("updated_at").$onUpdate(() => new Date()),
  }),
  (t) => [
    index("filament_brand_idx").on(t.brand),
    index("filament_material_idx").on(t.material),
    index("filament_is_active_idx").on(t.isActive),
  ],
);
