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
      <section className="py-20 bg-venice-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-semibold text-venice-text tracking-wider uppercase mb-4">
              Featured Applications
            </h2>
            <div className="w-24 h-1 bg-venice-coral mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="venice-card h-80 animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-venice-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold text-venice-text tracking-wider uppercase mb-4">
            Featured Applications
          </h2>
          <div className="w-24 h-1 bg-venice-coral mx-auto mb-8"></div>
          <p className="text-lg text-venice-light max-w-2xl mx-auto">
            Discover innovative applications built by our community using Venice.ai's private, decentralized AI API
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projects.slice(0, 3).map((project) => (
            <ProjectCard key={project.id} project={project} featured={true} />
          ))}
        </div>

        <div className="text-center">
          <Link href="/submit">
            <Button className="bg-venice-coral hover:bg-venice-coral/90 text-white font-medium rounded-full px-8 py-3 transition-all">
              Submit Your Application
              <ArrowRight className="ml-2" size={16} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
