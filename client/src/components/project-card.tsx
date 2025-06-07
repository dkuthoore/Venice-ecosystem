import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Heart, ExternalLink } from "lucide-react";
import type { ProjectWithCategory } from "@shared/schema";

interface ProjectCardProps {
  project: ProjectWithCategory;
  featured?: boolean;
}

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const rating = project.rating / 10; // Convert from stored integer to decimal

  const getStatusBadge = () => {
    if (project.isFeatured) {
      return <Badge className="bg-gradient-venice text-white">Featured</Badge>;
    }
    if (project.isTrending) {
      return <Badge className="bg-venice-accent text-white">Trending</Badge>;
    }
    if (project.isNew) {
      return <Badge className="bg-venice-success text-white">New</Badge>;
    }
    return null;
  };

  if (featured) {
    return (
      <div className="group bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-lg border border-gray-700 rounded-xl overflow-hidden hover:border-venice-primary/50 transition-all duration-300">
        <div className="relative">
          <img
            src={project.imageUrl}
            alt={project.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 left-4">
            {getStatusBadge()}
          </div>
          <div className="absolute top-4 right-4">
            <Button
              variant="ghost"
              size="sm"
              className="w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full p-0 text-white hover:bg-black/70"
            >
              <Heart size={14} />
            </Button>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <i className={`${project.category.icon} text-white text-sm`}></i>
            </div>
            <Link href={`/project/${project.id}`}>
              <h3 className="text-xl font-semibold hover:text-venice-primary transition-colors">
                {project.name}
              </h3>
            </Link>
          </div>
          <p className="text-gray-400 mb-4 line-clamp-2">
            {project.shortDescription}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-600 rounded-full"></div>
              <span className="text-sm text-gray-400">{project.developer}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-400">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span>{rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group bg-gray-900/50 backdrop-blur-lg border border-gray-700 rounded-xl overflow-hidden hover:border-venice-primary/50 transition-all duration-300">
      <div className="relative">
        <img
          src={project.imageUrl}
          alt={project.name}
          className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2">
          <Button
            variant="ghost"
            size="sm"
            className="w-6 h-6 bg-black/50 backdrop-blur-sm rounded-full p-0 text-white hover:bg-black/70"
          >
            <Heart size={12} />
          </Button>
        </div>
      </div>
      <div className="p-4">
        <Link href={`/project/${project.id}`}>
          <h3 className="text-lg font-semibold mb-2 group-hover:text-venice-primary transition-colors">
            {project.name}
          </h3>
        </Link>
        <p className="text-gray-400 text-sm mb-3 line-clamp-2">
          {project.shortDescription}
        </p>
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="text-xs">
            {project.category.name}
          </Badge>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Star className="w-3 h-3 text-yellow-400 fill-current" />
            <span>{rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
