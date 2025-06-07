import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { useEffect } from "react";
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

  // Scroll to top when component mounts or project changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectId]);

  const { data: project, isLoading, error } = useQuery<ProjectWithCategory>({
    queryKey: ["/api/projects", projectId],
    queryFn: () => fetch(`/api/projects/${projectId}`).then(res => res.json()),
    enabled: !!projectId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-venice-warm text-venice-text">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="h-64 bg-gray-200 rounded mb-8"></div>
            <div className="h-12 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-8"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-venice-warm text-venice-text">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-2xl font-bold text-venice-coral mb-4">Project Not Found</h1>
          <p className="text-venice-light mb-8">The project you're looking for doesn't exist or has been removed.</p>
          <Link href="/">
            <Button className="bg-venice-coral hover:bg-venice-coral/90 text-white">
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
    <div className="min-h-screen bg-venice-warm text-venice-text">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/directory">
          <Button variant="ghost" className="mb-8 text-venice-light hover:text-venice-text">
            <ArrowLeft className="mr-2" size={16} />
            Back to Directory
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <div className="flex items-start gap-6 mb-8">
                <div className="w-20 h-20 bg-venice-coral rounded-xl flex items-center justify-center text-white text-3xl flex-shrink-0">
                  {project.category.icon}
                </div>
                <div className="flex-1">
                  <h1 className="text-4xl md:text-5xl font-bold text-venice-text mb-2 leading-tight">{project.name}</h1>
                  <p className="text-xl text-venice-light mb-4">by {project.developer}</p>
                  <p className="text-lg text-venice-light leading-relaxed">{project.shortDescription}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mb-8">
                {project.isFeatured && <Badge className="bg-venice-coral text-white px-3 py-1">Featured</Badge>}
                {project.isTrending && <Badge className="bg-orange-500 text-white px-3 py-1">Trending</Badge>}
                {project.isNew && <Badge className="bg-green-600 text-white px-3 py-1">New</Badge>}
                <Badge variant="secondary" className="bg-gray-100 text-venice-text px-3 py-1">{project.category.name}</Badge>
              </div>

              <img
                src={project.imageUrl}
                alt={project.name}
                className="w-full h-64 md:h-96 object-cover rounded-xl mb-12 shadow-lg"
              />

              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-venice-text mb-6">About this application</h2>
                  <p className="text-lg text-venice-text leading-relaxed">{project.description}</p>
                </div>
                
                <div>
                  <h2 className="text-3xl font-bold text-venice-text mb-6">Features & Technologies</h2>
                  <div className="flex flex-wrap gap-3">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="border-venice-coral text-venice-coral hover:bg-venice-coral hover:text-white transition-colors px-4 py-2 text-sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-xl p-8 sticky top-24 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <Star className="w-6 h-6 text-yellow-500 fill-current" />
                  <span className="text-2xl font-bold text-venice-text">{rating.toFixed(1)}</span>
                </div>
                <Button variant="ghost" size="sm" className="text-venice-light hover:text-venice-coral">
                  <Heart className="w-5 h-5" />
                </Button>
              </div>

              <div className="space-y-4 mb-8">
                {project.externalUrl && (
                  <a
                    href={project.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button className="w-full bg-venice-coral hover:bg-venice-coral/90 text-white py-3 text-lg">
                      <ExternalLink className="mr-2" size={20} />
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
                    <Button variant="outline" className="w-full border-venice-coral text-venice-coral hover:bg-venice-coral hover:text-white py-3 text-lg">
                      <Github className="mr-2" size={20} />
                      View Source Code
                    </Button>
                  </a>
                )}
              </div>

              <div className="border-t border-gray-200 pt-6 mb-6">
                <h3 className="font-bold text-venice-text mb-4 text-lg">Developer</h3>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-venice-coral rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {project.developer.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-venice-text">{project.developer}</p>
                    <p className="text-sm text-venice-light">Venice.ai Developer</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <div className="mb-4">
                  <h3 className="font-bold text-venice-text mb-2">Category</h3>
                  <Badge variant="secondary" className="bg-gray-100 text-venice-text">{project.category.name}</Badge>
                </div>
                
                <div>
                  <h3 className="font-bold text-venice-text mb-2">Status</h3>
                  <Badge 
                    className={
                      project.status === "approved" 
                        ? "bg-green-100 text-green-700" 
                        : "bg-yellow-100 text-yellow-700"
                    }
                  >
                    {project.status}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
