import { useState } from "react";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { FeaturedProjects } from "@/components/featured-projects";
import { Footer } from "@/components/footer";
import type { SearchFilters } from "@/lib/types";

export default function Home() {
  const [filters, setFilters] = useState<SearchFilters>({
    search: "",
    sortBy: "recent",
  });

  const handleSearch = (search: string) => {
    setFilters(prev => ({ ...prev, search }));
  };

  return (
    <div className="min-h-screen bg-venice-warm text-venice-text">
      <Header />
      <Hero onSearch={handleSearch} />
      
      {/* Main Content Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-semibold text-venice-text tracking-wider uppercase mb-4">
              Unrestricted Intelligence
            </h2>
            <div className="w-24 h-1 bg-venice-coral mx-auto mb-12"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {/* Private AI Card */}
            <div className="venice-card p-8 group hover:scale-[1.02] transition-all duration-300">
              <div className="mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
                  alt="Private AI"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <h3 className="text-2xl font-bold text-venice-text mb-4">Private AI</h3>
              <p className="text-venice-light leading-relaxed">
                Our decentralized network keeps your AI prompts 100% private. All data stays on 
                your device, not our servers.
              </p>
            </div>

            {/* Uncensored AI Card */}
            <div className="venice-card p-8 group hover:scale-[1.02] transition-all duration-300 bg-venice-text">
              <div className="mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
                  alt="Uncensored AI"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Uncensored AI</h3>
              <p className="text-gray-300 leading-relaxed">
                Venice offers the most advanced, accurate, and uncensored models for a truly 
                unrestricted AI experience.
              </p>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-sm font-semibold text-venice-text tracking-wider uppercase mb-8">
              Privately Access Leading Open-Source Models
            </h2>
          </div>
        </div>
      </section>

      <FeaturedProjects />
      <Footer />
    </div>
  );
}
