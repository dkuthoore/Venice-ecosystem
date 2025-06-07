import { useQuery } from "@tanstack/react-query";
import { ProjectCard } from "./project-card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import type { ProjectWithCategory } from "@shared/schema";
import type { SearchFilters } from "@/lib/types";

interface ProjectGridProps {
  filters: SearchFilters;
  viewMode: "grid" | "list";
}

export function ProjectGrid({ filters, viewMode }: ProjectGridProps) {
  const queryParams = new URLSearchParams();
  if (filters.search) queryParams.set("search", filters.search);
  if (filters.categoryId) queryParams.set("categoryId", filters.categoryId.toString());
  if (filters.featured !== undefined) queryParams.set("featured", filters.featured.toString());
  if (filters.trending !== undefined) queryParams.set("trending", filters.trending.toString());
  
  const { data: projects = [], isLoading } = useQuery<ProjectWithCategory[]>({
    queryKey: ["/api/projects", filters],
    queryFn: () => fetch(`/api/projects?${queryParams.toString()}`).then(res => res.json()),
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-venice-dark-light/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold">All Applications</h2>
            <div className="text-gray-400">Loading...</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-900/50 rounded-xl h-64 animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const gridCols = viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4" : "grid-cols-1 md:grid-cols-2";

  return (
    <section className="py-16 bg-venice-dark-light/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold">All Applications</h2>
          <div className="text-gray-400">{projects.length} applications found</div>
        </div>

        <div className={`grid ${gridCols} gap-6`}>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
          
          {/* Load More Card */}
          <div className="group bg-gray-900/30 backdrop-blur-lg border-2 border-dashed border-gray-600 rounded-xl flex items-center justify-center h-48 hover:border-venice-primary/50 transition-all duration-300 cursor-pointer">
            <div className="text-center">
              <Plus className="w-8 h-8 text-gray-500 mb-3 group-hover:text-venice-primary transition-colors mx-auto" />
              <p className="text-gray-500 group-hover:text-venice-primary transition-colors">
                Load More Applications
              </p>
            </div>
          </div>
        </div>

        {/* Pagination */}
        {projects.length > 0 && (
          <div className="flex items-center justify-center mt-12">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                disabled
                className="bg-gray-800 border-gray-700 text-gray-300"
              >
                Previous
              </Button>
              <Button className="bg-venice-primary text-white">1</Button>
              <Button variant="outline" className="bg-gray-800 border-gray-700 text-gray-300">
                2
              </Button>
              <Button variant="outline" className="bg-gray-800 border-gray-700 text-gray-300">
                3
              </Button>
              <span className="px-2 text-gray-500">...</span>
              <Button variant="outline" className="bg-gray-800 border-gray-700 text-gray-300">
                12
              </Button>
              <Button variant="outline" className="bg-gray-800 border-gray-700 text-gray-300">
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
