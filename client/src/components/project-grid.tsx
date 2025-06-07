import { useQuery } from "@tanstack/react-query";
import { ProjectCard } from "./project-card";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Star } from "lucide-react";
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
      <section className="py-12 bg-venice-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-venice-text">All Applications</h2>
            <div className="text-venice-light">Loading...</div>
          </div>
          <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-xl h-64 animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (viewMode === "list") {
    return (
      <section className="py-12 bg-venice-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-venice-text">All Applications</h2>
            <div className="text-venice-light">{projects.length} applications found</div>
          </div>

          <div className="space-y-4">
            {projects.map((project) => (
              <Link key={project.id} href={`/project/${project.id}`}>
                <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-all duration-200 cursor-pointer">
                  <div className="flex gap-6">
                    <img
                      src={project.imageUrl}
                      alt={project.name}
                      className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl font-bold text-venice-text mb-2 truncate">{project.name}</h3>
                          <p className="text-venice-light mb-3 line-clamp-2">{project.shortDescription}</p>
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-sm text-venice-light">by {project.developer}</span>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span className="text-sm text-venice-text font-medium">{(project.rating / 10).toFixed(1)}</span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {project.isFeatured && <Badge className="bg-[#E85A4F] text-white">Featured</Badge>}
                            {project.isTrending && <Badge className="bg-orange-500 text-white">Trending</Badge>}
                            <Badge variant="secondary" className="bg-gray-100 text-venice-text">{project.category.name}</Badge>
                          </div>
                        </div>
                        <ExternalLink className="w-5 h-5 text-venice-light ml-4 flex-shrink-0" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-venice-warm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-venice-text">All Applications</h2>
          <div className="text-venice-light">{projects.length} applications found</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
