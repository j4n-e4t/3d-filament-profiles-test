// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import { index, sqliteTableCreator } from "drizzle-orm/sqlite-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = sqliteTableCreator(
  (name) => `3d-filament-profiles-test_${name}`,
);

export const filaments = createTable(
  "filament",
  (d) => ({
    id: d.integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
    brand: d.text({ length: 128 }).notNull(),
    material: d.text({ length: 128 }).notNull(), // PLA, ABS, PETG, etc.
    color: d.text({ length: 64 }),
    hexColor: d.text({ length: 7 }), // RGB hex color (e.g., #FF0000)
    diameter: d.real().notNull(), // 1.75mm or 2.85mm
    weight: d.real(), // in grams
    remainingWeight: d.real(), // remaining weight in grams
    price: d.real(), // price per kg
    purchaseDate: d.integer({ mode: "timestamp" }),
    nozzleTemp: d.integer(), // recommended nozzle temperature
    bedTemp: d.integer(), // recommended bed temperature
    printSpeed: d.integer(), // recommended print speed in mm/s
    retractionDistance: d.real(), // retraction distance in mm
    retractionSpeed: d.real(), // retraction speed in mm/s
    flowRate: d.real(), // flow rate multiplier (default 1.0)
    notes: d.text({ length: 1000 }),
    isActive: d.integer({ mode: "boolean" }).default(true).notNull(),
    createdAt: d
      .integer({ mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: d.integer({ mode: "timestamp" }).$onUpdate(() => new Date()),
  }),
  (t) => [
    index("filament_brand_idx").on(t.brand),
    index("filament_material_idx").on(t.material),
    index("filament_is_active_idx").on(t.isActive),
  ],
);

// Keep the posts table for now in case it's used elsewhere
export const posts = createTable(
  "post",
  (d) => ({
    id: d.integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
    name: d.text({ length: 256 }),
    createdAt: d
      .integer({ mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: d.integer({ mode: "timestamp" }).$onUpdate(() => new Date()),
  }),
  (t) => [index("post_name_idx").on(t.name)],
);
