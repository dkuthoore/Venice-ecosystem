import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Grid, List } from "lucide-react";
import type { Category } from "@shared/schema";
import type { SearchFilters } from "@/lib/types";

interface FiltersProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
}

export function Filters({ filters, onFiltersChange, viewMode, onViewModeChange }: FiltersProps) {
  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const handleCategoryClick = (categoryId: number) => {
    onFiltersChange({
      ...filters,
      categoryId: filters.categoryId === categoryId ? undefined : categoryId,
    });
  };

  const handleSortChange = (sortBy: string) => {
    onFiltersChange({ ...filters, sortBy });
  };

  return (
    <section className="py-8 bg-venice-dark-light/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-gray-400 font-medium">Filter by:</span>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant="outline"
                size="sm"
                onClick={() => handleCategoryClick(category.id)}
                className={`transition-all ${
                  filters.categoryId === category.id
                    ? "bg-venice-primary/20 hover:bg-venice-primary/30 text-venice-primary border-venice-primary/30"
                    : "bg-gray-800 hover:bg-gray-700 text-gray-300 border-gray-700"
                }`}
              >
                <i className={`${category.icon} mr-2`}></i>
                {category.name}
              </Button>
            ))}
          </div>
          
          <div className="flex items-center gap-4">
            <Select value={filters.sortBy} onValueChange={handleSortChange}>
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="trending">Trending</SelectItem>
                <SelectItem value="alphabetical">A-Z</SelectItem>
              </SelectContent>
            </Select>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewModeChange("grid")}
              className={`p-2 transition-all ${
                viewMode === "grid"
                  ? "bg-venice-primary/20 text-venice-primary border-venice-primary/30"
                  : "bg-gray-800 hover:bg-gray-700 text-gray-300 border-gray-700"
              }`}
            >
              <Grid size={16} />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewModeChange("list")}
              className={`p-2 transition-all ${
                viewMode === "list"
                  ? "bg-venice-primary/20 text-venice-primary border-venice-primary/30"
                  : "bg-gray-800 hover:bg-gray-700 text-gray-300 border-gray-700"
              }`}
            >
              <List size={16} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
