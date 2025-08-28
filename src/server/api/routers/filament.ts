import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { filaments } from "@/server/db/schema";
import { eq, desc, like, and } from "drizzle-orm";

export const filamentRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(11000).default(11000),
        offset: z.number().min(0).default(0),
        search: z.string().optional(),
        material: z.string().optional(),
        brand: z.string().optional(),
        isActive: z.boolean().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { limit, offset, search, material, brand, isActive } = input;

      let whereConditions = [];

      if (search) {
        whereConditions.push(like(filaments.name, `%${search}%`));
      }

      if (material) {
        whereConditions.push(eq(filaments.material, material));
      }

      if (brand) {
        whereConditions.push(eq(filaments.brand, brand));
      }

      if (isActive !== undefined) {
        whereConditions.push(eq(filaments.isActive, isActive));
      }

      const whereClause =
        whereConditions.length > 0 ? and(...whereConditions) : undefined;

      const results = await ctx.db
        .select()
        .from(filaments)
        .where(whereClause)
        .orderBy(desc(filaments.createdAt))
        .limit(limit)
        .offset(offset);

      const total = await ctx.db
        .select({ count: filaments.id })
        .from(filaments)
        .where(whereClause);

      return {
        filaments: results,
        total: total.length > 0 ? (total[0]?.count ?? 0) : 0,
      };
    }),

  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1).max(256),
        brand: z.string().min(1).max(128),
        material: z.string().min(1).max(128),
        color: z.string().max(64).optional(),
        diameter: z.number().positive(),
        weight: z.number().positive().optional(),
        remainingWeight: z.number().positive().optional(),
        price: z.number().positive().optional(),
        purchaseDate: z.date().optional(),
        nozzleTemp: z.number().positive().optional(),
        bedTemp: z.number().positive().optional(),
        printSpeed: z.number().positive().optional(),
        retractionDistance: z.number().positive().optional(),
        retractionSpeed: z.number().positive().optional(),
        flowRate: z.number().positive().optional(),
        notes: z.string().max(1000).optional(),
        isActive: z.boolean().default(true),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.db.insert(filaments).values(input).returning();

      return result[0];
    }),

  getMaterials: publicProcedure.query(async ({ ctx }) => {
    const result = await ctx.db
      .selectDistinct({ material: filaments.material })
      .from(filaments)
      .where(eq(filaments.isActive, true));

    return result.map((r) => r.material).filter(Boolean);
  }),

  getBrands: publicProcedure.query(async ({ ctx }) => {
    const result = await ctx.db
      .selectDistinct({ brand: filaments.brand })
      .from(filaments)
      .where(eq(filaments.isActive, true));

    return result.map((r) => r.brand).filter(Boolean);
  }),
});
