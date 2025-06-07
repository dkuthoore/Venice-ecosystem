import { categories, projects, type Category, type Project, type InsertCategory, type InsertProject, type ProjectWithCategory } from "@shared/schema";

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

export class MemStorage implements IStorage {
  private categories: Map<number, Category>;
  private projects: Map<number, Project>;
  private currentCategoryId: number;
  private currentProjectId: number;

  constructor() {
    this.categories = new Map();
    this.projects = new Map();
    this.currentCategoryId = 1;
    this.currentProjectId = 1;
    
    // Initialize with some default categories and projects
    this.initializeData();
  }

  private initializeData() {
    // Create default categories
    const defaultCategories: InsertCategory[] = [
      { name: "AI Tools", icon: "fas fa-robot", slug: "ai-tools" },
      { name: "Analytics", icon: "fas fa-chart-bar", slug: "analytics" },
      { name: "Gaming", icon: "fas fa-gamepad", slug: "gaming" },
      { name: "E-commerce", icon: "fas fa-shopping-cart", slug: "ecommerce" },
      { name: "Developer Tools", icon: "fas fa-code", slug: "developer-tools" },
      { name: "Education", icon: "fas fa-graduation-cap", slug: "education" },
      { name: "Healthcare", icon: "fas fa-heartbeat", slug: "healthcare" },
      { name: "Design", icon: "fas fa-palette", slug: "design" },
      { name: "Finance", icon: "fas fa-dollar-sign", slug: "finance" },
      { name: "Content Creation", icon: "fas fa-magic", slug: "content-creation" },
      { name: "Business Intelligence", icon: "fas fa-chart-line", slug: "business-intelligence" },
      { name: "AI Assistant", icon: "fas fa-brain", slug: "ai-assistant" },
    ];

    defaultCategories.forEach(category => {
      const id = this.currentCategoryId++;
      this.categories.set(id, { ...category, id });
    });

    // Create default projects
    const defaultProjects: Omit<InsertProject, 'categoryId'>[] = [
      {
        name: "AI Content Studio",
        description: "Generate high-quality content with AI assistance. From blog posts to social media, create engaging content in minutes with advanced AI models.",
        shortDescription: "Generate high-quality content with AI assistance. From blog posts to social media, create engaging content in minutes.",
        developer: "Sarah Chen",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        externalUrl: "https://example.com/ai-content-studio",
        githubUrl: "https://github.com/example/ai-content-studio",
        tags: ["Content Creation", "AI Writing"],
      },
      {
        name: "Smart Analytics",
        description: "AI-powered business intelligence platform that transforms your data into actionable insights and predictions using advanced machine learning algorithms.",
        shortDescription: "AI-powered business intelligence platform that transforms your data into actionable insights and predictions.",
        developer: "Marcus Rodriguez",
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        externalUrl: "https://example.com/smart-analytics",
        tags: ["Analytics", "Business Intelligence"],
      },
      {
        name: "AI Game Companion",
        description: "Intelligent gaming assistant that adapts to your playstyle and provides real-time strategic advice to enhance your gaming experience.",
        shortDescription: "Intelligent gaming assistant that adapts to your playstyle and provides real-time strategic advice.",
        developer: "Alex Kim",
        imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        externalUrl: "https://example.com/ai-game-companion",
        tags: ["Gaming", "AI Assistant"],
      },
    ];

    // Assign projects to categories and add them
    defaultProjects.forEach((project, index) => {
      const categoryIds = Array.from(this.categories.keys());
      const categoryId = categoryIds[index % categoryIds.length];
      const id = this.currentProjectId++;
      
      const fullProject: Project = {
        ...project,
        id,
        categoryId,
        rating: 48 + Math.floor(Math.random() * 12), // Random rating between 4.8-5.0
        isFeatured: index < 3,
        isNew: index === 2,
        isTrending: index === 1,
        status: "approved",
      };
      
      this.projects.set(id, fullProject);
    });
  }

  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(cat => cat.slug === slug);
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.currentCategoryId++;
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }

  async getProjects(filters?: {
    categoryId?: number;
    search?: string;
    featured?: boolean;
    trending?: boolean;
    status?: string;
  }): Promise<ProjectWithCategory[]> {
    let filteredProjects = Array.from(this.projects.values());

    // Apply filters
    if (filters) {
      if (filters.categoryId) {
        filteredProjects = filteredProjects.filter(p => p.categoryId === filters.categoryId);
      }
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredProjects = filteredProjects.filter(p => 
          p.name.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower) ||
          p.developer.toLowerCase().includes(searchLower) ||
          p.tags.some(tag => tag.toLowerCase().includes(searchLower))
        );
      }
      if (filters.featured !== undefined) {
        filteredProjects = filteredProjects.filter(p => p.isFeatured === filters.featured);
      }
      if (filters.trending !== undefined) {
        filteredProjects = filteredProjects.filter(p => p.isTrending === filters.trending);
      }
      if (filters.status) {
        filteredProjects = filteredProjects.filter(p => p.status === filters.status);
      }
    }

    // Join with categories
    return filteredProjects.map(project => {
      const category = this.categories.get(project.categoryId)!;
      return { ...project, category };
    });
  }

  async getProject(id: number): Promise<ProjectWithCategory | undefined> {
    const project = this.projects.get(id);
    if (!project) return undefined;

    const category = this.categories.get(project.categoryId)!;
    return { ...project, category };
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.currentProjectId++;
    const project: Project = {
      ...insertProject,
      id,
      rating: 45, // Default 4.5 rating
      isFeatured: false,
      isNew: true,
      isTrending: false,
      status: "pending",
    };
    this.projects.set(id, project);
    return project;
  }

  async updateProject(id: number, updates: Partial<Project>): Promise<Project | undefined> {
    const project = this.projects.get(id);
    if (!project) return undefined;

    const updatedProject = { ...project, ...updates };
    this.projects.set(id, updatedProject);
    return updatedProject;
  }

  async getStats(): Promise<{ totalApps: number; developers: number; categories: number }> {
    const approvedProjects = Array.from(this.projects.values()).filter(p => p.status === "approved");
    const uniqueDevelopers = new Set(approvedProjects.map(p => p.developer));
    
    return {
      totalApps: approvedProjects.length,
      developers: uniqueDevelopers.size,
      categories: this.categories.size,
    };
  }
}

export const storage = new MemStorage();
