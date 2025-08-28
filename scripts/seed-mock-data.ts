#!/usr/bin/env tsx

import "dotenv/config";
import { db } from "../src/server/db";
import { filaments } from "../src/server/db/schema";

// Mock data arrays
export const brands = [
  "Prusament",
  "Hatchbox",
  "Polymaker",
  "MatterHackers",
  "Overture",
  "Sunlu",
  "eSun",
  "Inland",
  "Amazon Basics",
  "Creality",
  "ColorFabb",
  "Fillamentum",
  "FormFutura",
  "Verbatim",
  "Ultimaker",
];

export const materials = [
  "PLA",
  "PLA+",
  "ABS",
  "PETG",
  "TPU",
  "TPE",
  "PC",
  "PVA",
  "HIPS",
  "ASA",
  "POM",
  "PMMA",
  "PA",
  "PPS",
  "PEEK",
];

export const colors = [
  "Black",
  "White",
  "Gray",
  "Silver",
  "Red",
  "Blue",
  "Green",
  "Yellow",
  "Orange",
  "Purple",
  "Pink",
  "Brown",
  "Transparent",
  "Glow in Dark",
  "Metallic",
  "Pearl",
  "Neon",
  "Pastel",
];

// Color to hex mapping
export const colorToHex: Record<string, string> = {
  Black: "#000000",
  White: "#FFFFFF",
  Gray: "#808080",
  Silver: "#C0C0C0",
  Red: "#FF0000",
  Blue: "#0000FF",
  Green: "#00FF00",
  Yellow: "#FFFF00",
  Orange: "#FFA500",
  Purple: "#800080",
  Pink: "#FFC0CB",
  Brown: "#A52A2A",
  Transparent: "#FFFFFF",
  "Glow in Dark": "#00FF00",
  Metallic: "#C0C0C0",
  Pearl: "#F0E68C",
  Neon: "#FF1493",
  Pastel: "#FFB6C1",
};

export const diameters = [1.75, 2.85];

// Material-specific temperature and print settings
export const materialSettings = {
  PLA: {
    nozzleTemp: { min: 190, max: 220 },
    bedTemp: { min: 50, max: 70 },
    printSpeed: { min: 40, max: 80 },
    retractionDistance: { min: 0.8, max: 2.0 },
    retractionSpeed: { min: 30, max: 60 },
    flowRate: { min: 0.95, max: 1.05 },
  },
  "PLA+": {
    nozzleTemp: { min: 200, max: 230 },
    bedTemp: { min: 55, max: 75 },
    printSpeed: { min: 35, max: 70 },
    retractionDistance: { min: 0.8, max: 2.0 },
    retractionSpeed: { min: 30, max: 60 },
    flowRate: { min: 0.95, max: 1.05 },
  },
  ABS: {
    nozzleTemp: { min: 230, max: 260 },
    bedTemp: { min: 100, max: 120 },
    printSpeed: { min: 30, max: 60 },
    retractionDistance: { min: 1.5, max: 3.0 },
    retractionSpeed: { min: 40, max: 70 },
    flowRate: { min: 0.9, max: 1.1 },
  },
  PETG: {
    nozzleTemp: { min: 230, max: 250 },
    bedTemp: { min: 70, max: 90 },
    printSpeed: { min: 25, max: 50 },
    retractionDistance: { min: 1.0, max: 2.5 },
    retractionSpeed: { min: 35, max: 65 },
    flowRate: { min: 0.9, max: 1.1 },
  },
  TPU: {
    nozzleTemp: { min: 210, max: 240 },
    bedTemp: { min: 50, max: 70 },
    printSpeed: { min: 15, max: 35 },
    retractionDistance: { min: 0.5, max: 1.5 },
    retractionSpeed: { min: 20, max: 40 },
    flowRate: { min: 0.9, max: 1.1 },
  },
  TPE: {
    nozzleTemp: { min: 210, max: 240 },
    bedTemp: { min: 50, max: 70 },
    printSpeed: { min: 15, max: 35 },
    retractionDistance: { min: 0.5, max: 1.5 },
    retractionSpeed: { min: 20, max: 40 },
    flowRate: { min: 0.9, max: 1.1 },
  },
  PC: {
    nozzleTemp: { min: 260, max: 300 },
    bedTemp: { min: 110, max: 130 },
    printSpeed: { min: 20, max: 40 },
    retractionDistance: { min: 2.0, max: 4.0 },
    retractionSpeed: { min: 50, max: 80 },
    flowRate: { min: 0.9, max: 1.1 },
  },
  PVA: {
    nozzleTemp: { min: 190, max: 220 },
    bedTemp: { min: 50, max: 70 },
    printSpeed: { min: 30, max: 50 },
    retractionDistance: { min: 1.0, max: 2.0 },
    retractionSpeed: { min: 25, max: 45 },
    flowRate: { min: 0.95, max: 1.05 },
  },
  HIPS: {
    nozzleTemp: { min: 230, max: 260 },
    bedTemp: { min: 100, max: 120 },
    printSpeed: { min: 30, max: 60 },
    retractionDistance: { min: 1.5, max: 3.0 },
    retractionSpeed: { min: 40, max: 70 },
    flowRate: { min: 0.9, max: 1.1 },
  },
  ASA: {
    nozzleTemp: { min: 240, max: 270 },
    bedTemp: { min: 100, max: 120 },
    printSpeed: { min: 25, max: 50 },
    retractionDistance: { min: 1.5, max: 3.0 },
    retractionSpeed: { min: 40, max: 70 },
    flowRate: { min: 0.9, max: 1.1 },
  },
  POM: {
    nozzleTemp: { min: 200, max: 230 },
    bedTemp: { min: 80, max: 100 },
    printSpeed: { min: 20, max: 40 },
    retractionDistance: { min: 1.0, max: 2.5 },
    retractionSpeed: { min: 30, max: 60 },
    flowRate: { min: 0.9, max: 1.1 },
  },
  PMMA: {
    nozzleTemp: { min: 230, max: 260 },
    bedTemp: { min: 90, max: 110 },
    printSpeed: { min: 25, max: 45 },
    retractionDistance: { min: 1.5, max: 3.0 },
    retractionSpeed: { min: 35, max: 65 },
    flowRate: { min: 0.9, max: 1.1 },
  },
  PA: {
    nozzleTemp: { min: 240, max: 280 },
    bedTemp: { min: 80, max: 100 },
    printSpeed: { min: 20, max: 40 },
    retractionDistance: { min: 2.0, max: 4.0 },
    retractionSpeed: { min: 45, max: 75 },
    flowRate: { min: 0.9, max: 1.1 },
  },
  PPS: {
    nozzleTemp: { min: 300, max: 340 },
    bedTemp: { min: 120, max: 140 },
    printSpeed: { min: 15, max: 30 },
    retractionDistance: { min: 2.5, max: 4.5 },
    retractionSpeed: { min: 60, max: 90 },
    flowRate: { min: 0.85, max: 1.05 },
  },
  PEEK: {
    nozzleTemp: { min: 360, max: 400 },
    bedTemp: { min: 140, max: 160 },
    printSpeed: { min: 10, max: 25 },
    retractionDistance: { min: 3.0, max: 5.0 },
    retractionSpeed: { min: 70, max: 100 },
    flowRate: { min: 0.8, max: 1.0 },
  },
};

// Helper function to get random value from array
export function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]!;
}

// Helper function to get random number within range
export function getRandomNumber(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

// Helper function to get random integer within range
export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Helper function to get random boolean
export function getRandomBoolean(): boolean {
  return Math.random() > 0.3; // 70% chance of true
}

// Helper function to get random date within last 2 years
export function getRandomDate(): Date {
  const now = new Date();
  const twoYearsAgo = new Date(now.getTime() - 2 * 365 * 24 * 60 * 60 * 1000);
  return new Date(
    twoYearsAgo.getTime() +
      Math.random() * (now.getTime() - twoYearsAgo.getTime()),
  );
}

// Generate a single filament entry
export function generateFilament() {
  const material = getRandomItem(materials);
  const settings = materialSettings[material as keyof typeof materialSettings]!;
  const brand = getRandomItem(brands);
  const color = getRandomItem(colors);
  const diameter = getRandomItem(diameters);

  // Generate realistic weight (typically 1kg spools)
  const weight = getRandomNumber(800, 1200);
  const remainingWeight = getRandomNumber(0, weight);

  // Generate realistic price per kg
  const price = getRandomNumber(15, 150);

  const filament = {
    brand,
    material,
    color,
    hexColor: colorToHex[color],
    diameter: diameter.toString(), // Convert to string as schema expects numeric
    weight: weight.toString(), // Convert to string as schema expects numeric
    remainingWeight: remainingWeight.toString(), // Convert to string as schema expects numeric
    price: price.toString(), // Convert to string as schema expects numeric
    purchaseDate: getRandomDate(),
    nozzleTemp: getRandomInt(settings.nozzleTemp.min, settings.nozzleTemp.max),
    bedTemp: getRandomInt(settings.bedTemp.min, settings.bedTemp.max),
    printSpeed: getRandomInt(settings.printSpeed.min, settings.printSpeed.max),
    retractionDistance: getRandomNumber(
      settings.retractionDistance.min,
      settings.retractionDistance.max,
    ).toString(), // Convert to string as schema expects numeric
    retractionSpeed: getRandomNumber(
      settings.retractionSpeed.min,
      settings.retractionSpeed.max,
    ).toString(), // Convert to string as schema expects numeric
    flowRate: getRandomNumber(
      settings.flowRate.min,
      settings.flowRate.max,
    ).toString(), // Convert to string as schema expects numeric
    notes: getRandomBoolean() ? getRandomNotes(material, brand) : undefined,
    isActive: getRandomBoolean(),
  };

  return filament;
}

// Generate random notes
function getRandomNotes(material: string, brand: string): string {
  const noteTemplates = [
    `Great ${material} filament from ${brand}. Prints smoothly with minimal stringing.`,
    `${brand} ${material} - excellent layer adhesion and surface finish.`,
    `Good quality ${material} from ${brand}. Slightly hygroscopic, store in dry box.`,
    `${brand} ${material} works well for functional parts. Good dimensional accuracy.`,
    `Premium ${material} filament. Excellent color consistency and minimal warping.`,
    `${brand} ${material} - good for prototyping. Affordable and reliable.`,
    `High-quality ${material} with consistent diameter. Great for detailed prints.`,
    `${brand} ${material} - excellent for mechanical parts. Strong and durable.`,
    `Good ${material} filament. Requires proper bed adhesion for best results.`,
    `${brand} ${material} - consistent quality, good for both functional and decorative prints.`,
  ];

  return getRandomItem(noteTemplates);
}

// Main function to seed the database
async function seedDatabase() {
  try {
    console.log("🌱 Starting database seeding...");

    // Check if we already have data
    const existingCount = await db
      .select({ count: filaments.id })
      .from(filaments);

    if (
      existingCount.length > 0 &&
      existingCount[0]?.count !== undefined &&
      existingCount[0].count > 0
    ) {
      console.log(
        `⚠️  Database already contains ${existingCount[0].count} filaments.`,
      );
      const shouldContinue = process.argv.includes("--force");
      if (!shouldContinue) {
        console.log("Use --force flag to overwrite existing data.");
        process.exit(0);
      }
      console.log("🔄 Force flag detected, proceeding with seeding...");
    }

    // Generate mock data
    const numberOfFilaments = parseInt(process.argv[2] || "50") || 50;
    console.log(`📦 Generating ${numberOfFilaments} filament entries...`);

    const mockFilaments = [];
    for (let i = 0; i < numberOfFilaments; i++) {
      mockFilaments.push(generateFilament());
    }

    // Insert data into database
    console.log("💾 Inserting data into database...");

    // If force flag is used, clear existing data first
    if (process.argv.includes("--force")) {
      await db.delete(filaments);
      console.log("🗑️  Cleared existing data.");
    }

    // Insert data in batches to avoid potential memory issues
    const batchSize = 1000; // PostgreSQL can handle larger batches than SQLite
    let totalInserted = 0;

    for (let i = 0; i < mockFilaments.length; i += batchSize) {
      const batch = mockFilaments.slice(i, i + batchSize);
      await db.insert(filaments).values(batch);
      totalInserted += batch.length;

      console.log(
        `📦 Inserted batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(mockFilaments.length / batchSize)} (${batch.length} records)`,
      );
    }

    console.log(
      `✅ Successfully seeded database with ${totalInserted} filament entries!`,
    );
    console.log(`📊 Database now contains ${totalInserted} total entries.`);

    // Show some statistics
    const materialStats = await db
      .select({ material: filaments.material, count: filaments.id })
      .from(filaments)
      .groupBy(filaments.material);

    console.log("\n📈 Material distribution:");
    materialStats.forEach((stat) => {
      if (stat.material && stat.count !== undefined) {
        console.log(`   ${stat.material}: ${stat.count} filaments`);
      }
    });

    const brandStats = await db
      .select({ brand: filaments.brand, count: filaments.id })
      .from(filaments)
      .groupBy(filaments.brand);

    console.log("\n🏷️  Brand distribution:");
    brandStats.forEach((stat) => {
      if (stat.brand && stat.count !== undefined) {
        console.log(`   ${stat.brand}: ${stat.count} filaments`);
      }
    });

    console.log("\n🎉 Seeding completed successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

// Run the seeding function
seedDatabase();
