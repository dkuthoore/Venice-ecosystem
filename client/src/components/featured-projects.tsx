import { useQuery } from "@tanstack/react-query";
import { ProjectCard } from "./project-card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import type { ProjectWithCategory } from "@shared/schema";

export function FeaturedProjects() {
  const { data: projects = [], isLoading } = useQuery<ProjectWithCategory[]>({
    queryKey: ["/api/projects", { featured: true }],
    queryFn: () => fetch("/api/projects?featured=true").then(res => res.json()),
  });

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold">Featured Projects</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-900/50 rounded-xl h-80 animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold">Featured Projects</h2>
          <Link href="/?featured=true">
            <Button variant="ghost" className="text-venice-primary hover:text-venice-secondary">
              View All <ArrowRight className="ml-2" size={16} />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {projects.slice(0, 3).map((project) => (
            <ProjectCard key={project.id} project={project} featured={true} />
          ))}
        </div>
      </div>
    </section>
  );
}
