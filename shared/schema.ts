import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  icon: text("icon").notNull(),
  slug: text("slug").notNull().unique(),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  shortDescription: text("short_description").notNull(),
  developer: text("developer").notNull(),
  developerEmail: text("developer_email"),
  developerTwitter: text("developer_twitter"),
  developerGithub: text("developer_github"),
  developerWebsite: text("developer_website"),
  imageUrl: text("image_url").notNull(),
  externalUrl: text("external_url"),
  githubUrl: text("github_url"),
  categoryId: integer("category_id").references(() => categories.id).notNull(),
  rating: integer("rating").notNull().default(5), // Rating out of 5, stored as integer (e.g., 48 = 4.8)
  isFeatured: boolean("is_featured").notNull().default(false),
  isNew: boolean("is_new").notNull().default(false),
  isTrending: boolean("is_trending").notNull().default(false),
  tags: text("tags").array().notNull().default([]),
  status: text("status").notNull().default("pending"), // pending, approved, rejected
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertCategorySchema = createInsertSchema(categories).omit({
  id: true,
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  rating: true,
  isFeatured: true,
  isNew: true,
  isTrending: true,
  status: true,
  createdAt: true,
}).extend({
  rating: z.number().min(1).max(50).optional(),
  tags: z.array(z.string()).optional(),
});

export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Category = typeof categories.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

// Combined type for project with category
export type ProjectWithCategory = Project & {
  category: Category;
};
