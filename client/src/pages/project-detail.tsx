import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, Github, Star, Heart } from "lucide-react";
import { Link } from "wouter";
import type { ProjectWithCategory } from "@shared/schema";

export default function ProjectDetail() {
  const [match, params] = useRoute("/project/:id");
  const projectId = params?.id ? parseInt(params.id) : null;

  const { data: project, isLoading, error } = useQuery<ProjectWithCategory>({
    queryKey: ["/api/projects", projectId],
    queryFn: () => fetch(`/api/projects/${projectId}`).then(res => res.json()),
    enabled: !!projectId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-venice-dark text-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-800 rounded w-1/4 mb-8"></div>
            <div className="h-64 bg-gray-800 rounded mb-8"></div>
            <div className="h-12 bg-gray-800 rounded w-1/2 mb-4"></div>
            <div className="h-6 bg-gray-800 rounded w-3/4 mb-8"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-venice-dark text-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-2xl font-bold text-red-400 mb-4">Project Not Found</h1>
          <p className="text-gray-400 mb-8">The project you're looking for doesn't exist or has been removed.</p>
          <Link href="/">
            <Button className="bg-gradient-venice">
              <ArrowLeft className="mr-2" size={16} />
              Back to Home
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const rating = project.rating / 10;

  return (
    <div className="min-h-screen bg-venice-dark text-white">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/">
          <Button variant="ghost" className="mb-8 text-gray-300 hover:text-white">
            <ArrowLeft className="mr-2" size={16} />
            Back to Directory
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <i className={`${project.category.icon} text-white text-2xl`}></i>
                </div>
                <div>
                  <h1 className="text-4xl font-bold">{project.name}</h1>
                  <p className="text-gray-400">by {project.developer}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.isFeatured && <Badge className="bg-gradient-venice text-white">Featured</Badge>}
                {project.isTrending && <Badge className="bg-venice-accent text-white">Trending</Badge>}
                {project.isNew && <Badge className="bg-venice-success text-white">New</Badge>}
                <Badge variant="secondary">{project.category.name}</Badge>
              </div>

              <img
                src={project.imageUrl}
                alt={project.name}
                className="w-full h-64 md:h-96 object-cover rounded-xl mb-8"
              />

              <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold mb-4">About this application</h2>
                <p className="text-gray-300 leading-relaxed mb-6">{project.description}</p>
                
                <h2 className="text-2xl font-bold mb-4">Features</h2>
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="border-gray-700 text-gray-300">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6 sticky top-24">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="text-xl font-bold">{rating.toFixed(1)}</span>
                </div>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-400">
                  <Heart className="w-5 h-5" />
                </Button>
              </div>

              <div className="space-y-4">
                {project.externalUrl && (
                  <a
                    href={project.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button className="w-full bg-gradient-venice hover:opacity-90">
                      <ExternalLink className="mr-2" size={16} />
                      Visit Application
                    </Button>
                  </a>
                )}

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button variant="outline" className="w-full border-gray-700 text-gray-300">
                      <Github className="mr-2" size={16} />
                      View Source Code
                    </Button>
                  </a>
                )}
              </div>

              <div className="border-t border-gray-700 mt-8 pt-6">
                <h3 className="font-semibold mb-4">Developer</h3>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
                  <div>
                    <p className="font-medium">{project.developer}</p>
                    <p className="text-sm text-gray-400">Venice.ai Developer</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-700 mt-6 pt-6">
                <h3 className="font-semibold mb-2">Category</h3>
                <Badge variant="secondary" className="mb-4">{project.category.name}</Badge>
                
                <h3 className="font-semibold mb-2">Status</h3>
                <Badge 
                  className={
                    project.status === "approved" 
                      ? "bg-green-500/20 text-green-400" 
                      : "bg-yellow-500/20 text-yellow-400"
                  }
                >
                  {project.status}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
