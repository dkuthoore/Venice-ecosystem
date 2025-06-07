import { categories, projects, type Category, type Project, type InsertCategory, type InsertProject, type ProjectWithCategory } from "@shared/schema";
import { db } from "./db";
import { eq, and, ilike, or, count, countDistinct, desc } from "drizzle-orm";

export interface IStorage {
  // Categories
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;

  // Projects
  getProjects(filters?: {
    categoryId?: number;
    search?: string;
    featured?: boolean;
    trending?: boolean;
    status?: string;
  }): Promise<ProjectWithCategory[]>;
  getProject(id: number): Promise<ProjectWithCategory | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, updates: Partial<Project>): Promise<Project | undefined>;
  
  // Stats
  getStats(): Promise<{
    totalApps: number;
    developers: number;
    categories: number;
  }>;
}

export class DatabaseStorage implements IStorage {
  async getCategories(): Promise<Category[]> {
    return await db.select().from(categories);
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    const [category] = await db.select().from(categories).where(eq(categories.slug, slug));
    return category || undefined;
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const [category] = await db
      .insert(categories)
      .values(insertCategory)
      .returning();
    return category;
  }

  async getProjects(filters?: {
    categoryId?: number;
    search?: string;
    featured?: boolean;
    trending?: boolean;
    status?: string;
    sortBy?: string;
  }): Promise<ProjectWithCategory[]> {
    const conditions = [];
    
    if (filters?.categoryId) {
      conditions.push(eq(projects.categoryId, filters.categoryId));
    }
    if (filters?.search) {
      conditions.push(
        or(
          ilike(projects.name, `%${filters.search}%`),
          ilike(projects.description, `%${filters.search}%`),
          ilike(projects.developer, `%${filters.search}%`)
        )
      );
    }
    if (filters?.featured !== undefined) {
      conditions.push(eq(projects.isFeatured, filters.featured));
    }
    if (filters?.trending !== undefined) {
      conditions.push(eq(projects.isTrending, filters.trending));
    }
    if (filters?.status) {
      conditions.push(eq(projects.status, filters.status));
    }

    // Build query with conditions
    let query;
    if (conditions.length > 0) {
      query = db
        .select()
        .from(projects)
        .leftJoin(categories, eq(projects.categoryId, categories.id))
        .where(and(...conditions));
    } else {
      query = db
        .select()
        .from(projects)
        .leftJoin(categories, eq(projects.categoryId, categories.id));
    }

    const results = await query;
    
    return results.map(row => ({
      ...row.projects,
      category: row.categories!
    }));
  }

  async getProject(id: number): Promise<ProjectWithCategory | undefined> {
    const [result] = await db
      .select()
      .from(projects)
      .leftJoin(categories, eq(projects.categoryId, categories.id))
      .where(eq(projects.id, id));

    if (!result) return undefined;

    return {
      ...result.projects,
      category: result.categories!
    };
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const [project] = await db
      .insert(projects)
      .values({
        ...insertProject,
        rating: 45,
        isFeatured: false,
        isNew: true,
        isTrending: false,
        status: "approved",
        tags: insertProject.tags || [],
      })
      .returning();
    return project;
  }

  async updateProject(id: number, updates: Partial<Project>): Promise<Project | undefined> {
    const [project] = await db
      .update(projects)
      .set(updates)
      .where(eq(projects.id, id))
      .returning();
    return project || undefined;
  }

  async getStats(): Promise<{ totalApps: number; developers: number; categories: number }> {
    const [approvedProjectsCount] = await db
      .select({ count: count() })
      .from(projects)
      .where(eq(projects.status, "approved"));
    
    const [categoriesCount] = await db
      .select({ count: count() })
      .from(categories);

    const [developersCount] = await db
      .select({ count: countDistinct(projects.developer) })
      .from(projects)
      .where(eq(projects.status, "approved"));

    return {
      totalApps: approvedProjectsCount?.count || 0,
      developers: developersCount?.count || 0,
      categories: categoriesCount?.count || 0,
    };
  }
}

export const storage = new DatabaseStorage();