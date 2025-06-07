import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Grid, List, Filter, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Category } from "@shared/schema";
import type { SearchFilters } from "@/lib/types";

interface FiltersProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
}

export function Filters({ filters, onFiltersChange, viewMode, onViewModeChange }: FiltersProps) {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  
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

  const handleToggleFilter = (filterType: keyof SearchFilters, value: boolean) => {
    onFiltersChange({
      ...filters,
      [filterType]: filters[filterType] === value ? undefined : value,
    });
  };

  const activeFiltersCount = [
    filters.categoryId,
    filters.featured,
    filters.trending,
  ].filter(Boolean).length;

  return (
    <section className="py-6 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className="border-gray-300 text-venice-text hover:bg-gray-50"
            >
              <Filter size={16} className="mr-2" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge className="ml-2 bg-[#E85A4F] text-white">{activeFiltersCount}</Badge>
              )}
              <ChevronDown 
                size={16} 
                className={`ml-2 transition-transform ${showAdvancedFilters ? 'rotate-180' : ''}`} 
              />
            </Button>
            
            <Select value={filters.sortBy} onValueChange={handleSortChange}>
              <SelectTrigger className="w-40 border-gray-300 text-venice-text">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="trending">Trending</SelectItem>
                <SelectItem value="alphabetical">A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => onViewModeChange("grid")}
              className={viewMode === "grid" 
                ? "bg-[#E85A4F] hover:bg-[#E85A4F]/90 text-white" 
                : "border-gray-300 text-venice-text hover:bg-gray-50"
              }
            >
              <Grid size={16} />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => onViewModeChange("list")}
              className={viewMode === "list" 
                ? "bg-[#E85A4F] hover:bg-[#E85A4F]/90 text-white" 
                : "border-gray-300 text-venice-text hover:bg-gray-50"
              }
            >
              <List size={16} />
            </Button>
          </div>
        </div>

        {/* Advanced Filters */}
        {showAdvancedFilters && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-venice-text mb-3">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant="outline"
                      size="sm"
                      onClick={() => handleCategoryClick(category.id)}
                      className={`transition-all ${
                        filters.categoryId === category.id
                          ? "bg-[#E85A4F] text-white border-[#E85A4F]"
                          : "border-gray-300 text-venice-text hover:bg-gray-100"
                      }`}
                    >
                      <span className="mr-2">{category.icon}</span>
                      {category.name}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-venice-text mb-3">Status</h3>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleToggleFilter('featured', true)}
                    className={`transition-all ${
                      filters.featured === true
                        ? "bg-[#E85A4F] text-white border-[#E85A4F]"
                        : "border-gray-300 text-venice-text hover:bg-gray-100"
                    }`}
                  >
                    Featured
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleToggleFilter('trending', true)}
                    className={`transition-all ${
                      filters.trending === true
                        ? "bg-[#E85A4F] text-white border-[#E85A4F]"
                        : "border-gray-300 text-venice-text hover:bg-gray-100"
                    }`}
                  >
                    Trending
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
