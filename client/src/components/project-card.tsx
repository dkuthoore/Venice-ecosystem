import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ExternalLink, ArrowUpRight } from "lucide-react";
import type { ProjectWithCategory } from "@shared/schema";

interface ProjectCardProps {
  project: ProjectWithCategory;
  featured?: boolean;
}

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const rating = project.rating / 10; // Convert from stored integer to decimal

  const getStatusBadge = () => {
    if (project.isFeatured) {
      return <Badge className="bg-venice-coral text-white rounded-full">Featured</Badge>;
    }
    if (project.isTrending) {
      return <Badge className="bg-orange-500 text-white rounded-full">Trending</Badge>;
    }
    if (project.isNew) {
      return <Badge className="bg-green-500 text-white rounded-full">New</Badge>;
    }
    return null;
  };

  if (featured) {
    return (
      <div className="venice-card overflow-hidden group hover:scale-[1.02] transition-all duration-300">
        <div className="relative">
          <img
            src={project.imageUrl}
            alt={project.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4">
            {getStatusBadge()}
          </div>
          <div className="absolute top-4 right-4">
            <Button
              variant="ghost"
              size="sm"
              className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full p-0 text-venice-text hover:bg-white transition-all"
            >
              <ArrowUpRight size={14} />
            </Button>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <Link href={`/project/${project.id}`}>
              <h3 className="text-xl font-semibold text-venice-text hover:text-venice-coral transition-colors group-hover:text-venice-coral">
                {project.name}
              </h3>
            </Link>
            <div className="flex items-center gap-1 text-sm text-venice-light">
              <Star className="w-4 h-4 text-amber-400 fill-current" />
              <span>{rating.toFixed(1)}</span>
            </div>
          </div>
          
          <p className="text-venice-light mb-4 line-clamp-2 leading-relaxed">
            {project.shortDescription}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs bg-venice-beige text-venice-text rounded-full">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-venice">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-venice-coral rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-medium">
                  {project.developer.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="text-sm text-venice-light">{project.developer}</span>
            </div>
            <Badge variant="outline" className="text-xs border-venice text-venice-light rounded-full">
              {project.category.name}
            </Badge>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="venice-card overflow-hidden group hover:scale-[1.01] transition-all duration-300">
      <div className="relative">
        <img
          src={project.imageUrl}
          alt={project.name}
          className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2 right-2">
          <Button
            variant="ghost"
            size="sm"
            className="w-6 h-6 bg-white/90 backdrop-blur-sm rounded-full p-0 text-venice-text hover:bg-white transition-all"
          >
            <ArrowUpRight size={12} />
          </Button>
        </div>
      </div>
      <div className="p-4">
        <Link href={`/project/${project.id}`}>
          <h3 className="text-lg font-semibold mb-2 text-venice-text group-hover:text-venice-coral transition-colors">
            {project.name}
          </h3>
        </Link>
        <p className="text-venice-light text-sm mb-3 line-clamp-2">
          {project.shortDescription}
        </p>
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-xs border-venice text-venice-light rounded-full">
            {project.category.name}
          </Badge>
          <div className="flex items-center gap-1 text-xs text-venice-light">
            <Star className="w-3 h-3 text-amber-400 fill-current" />
            <span>{rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
