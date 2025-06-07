import { useState } from "react";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Filters } from "@/components/filters";
import { FeaturedProjects } from "@/components/featured-projects";
import { ProjectGrid } from "@/components/project-grid";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import type { SearchFilters } from "@/lib/types";

export default function Home() {
  const [filters, setFilters] = useState<SearchFilters>({
    search: "",
    sortBy: "recent",
  });
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const handleSearch = (search: string) => {
    setFilters(prev => ({ ...prev, search }));
  };

  return (
    <div className="min-h-screen bg-venice-dark text-white">
      <Header />
      <Hero onSearch={handleSearch} />
      <Filters 
        filters={filters}
        onFiltersChange={setFilters}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />
      <FeaturedProjects />
      <ProjectGrid filters={filters} viewMode={viewMode} />
      
      {/* Submit Project CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-venice opacity-10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Showcase Your Venice.ai App?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join our growing community of developers and share your innovative applications built with Venice.ai's powerful API.
          </p>
          <Link href="/submit">
            <Button className="bg-gradient-venice hover:opacity-90 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-lg shadow-venice-primary/25">
              Submit Your Application
              <ArrowRight className="ml-3" size={20} />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
