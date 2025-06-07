import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import type { Stats } from "@/lib/types";

interface HeroProps {
  onSearch: (query: string) => void;
}

export function Hero({ onSearch }: HeroProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: stats, isLoading } = useQuery<Stats>({
    queryKey: ["/api/stats"],
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-warm">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 25% 25%, #f3f1ed 0%, transparent 50%), radial-gradient(circle at 75% 75%, #f8f6f2 0%, transparent 50%)'
        }}></div>
      </div>
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mb-8">
            <div className="w-16 h-16 mx-auto mb-6 bg-venice-coral rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L3 7v10c0 5.55 3.84 9.74 9 10.86C17.16 26.74 21 22.55 21 17V7l-9-5z"/>
              </svg>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-venice-text leading-tight">
            Welcome to
            <span className="block font-serif italic text-venice-coral mt-2">
              Venice
            </span>
          </h1>
          
          <p className="text-xl text-venice-light mb-12 max-w-3xl mx-auto leading-relaxed">
            Explore the growing ecosystem of applications built with Venice.ai's private, decentralized AI API. 
            Find inspiration, discover tools, and showcase your own creations.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-16">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search applications, developers, or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 bg-white border border-venice rounded-full text-venice-text placeholder-venice-light focus:outline-none focus:ring-2 focus:ring-venice-coral focus:border-transparent shadow-sm"
              />
              <Button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-venice-coral hover:bg-venice-coral/90 text-white px-6 py-2 rounded-full transition-all"
              >
                <Search size={16} />
              </Button>
            </form>
          </div>

          {/* Stats */}
          <div className="text-center">
            <h2 className="text-sm font-semibold text-venice-text tracking-wider uppercase mb-6">
              Community Statistics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-venice-coral mb-1">
                  {isLoading ? "..." : stats?.totalApps || 0}
                </div>
                <div className="text-sm text-venice-light">Applications</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-venice-coral mb-1">
                  {isLoading ? "..." : stats?.developers || 0}
                </div>
                <div className="text-sm text-venice-light">Developers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-venice-coral mb-1">
                  {isLoading ? "..." : stats?.categories || 0}
                </div>
                <div className="text-sm text-venice-light">Categories</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
