export interface SearchFilters {
  search: string;
  categoryId?: number;
  featured?: boolean;
  trending?: boolean;
  sortBy: string;
}

export interface Stats {
  totalApps: number;
  developers: number;
  categories: number;
}
