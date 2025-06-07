import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { SearchFilters } from "@/lib/types";
import { Filters } from "@/components/filters";
import { ProjectGrid } from "@/components/project-grid";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Search } from "lucide-react";

export default function Directory() {
  const [filters, setFilters] = useState<SearchFilters>({
    search: "",
    categoryId: undefined,
    featured: undefined,
    trending: undefined,
    sortBy: "newest",
  });

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="min-h-screen bg-venice-warm text-venice-text">
      <Header />

      {/* Hero Section with Search */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-venice-text mb-6">
              Discover AI Apps
            </h1>
            <p className="text-xl text-venice-light max-w-3xl mx-auto mb-8">
              Explore applications built with Venice.ai's private AI
              infrastructure
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-venice-light w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search projects, developers, or technologies..."
                  value={filters.search}
                  onChange={(e) =>
                    setFilters({ ...filters, search: e.target.value })
                  }
                  className="w-full pl-12 pr-4 py-4 text-lg border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-venice-coral focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Projects */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Filters
            filters={filters}
            onFiltersChange={setFilters}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />

          <ProjectGrid filters={filters} viewMode={viewMode} />
        </div>
      </section>

      <Footer />
    </div>
  );
}
