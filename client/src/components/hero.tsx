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
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-dark"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Discover AI-Powered
            <span className="bg-gradient-venice bg-clip-text text-transparent ml-4">
              Applications
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Explore the growing ecosystem of applications built with Venice.ai's private, decentralized AI API. 
            Find inspiration, discover tools, and showcase your own creations.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search applications, categories, or developers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 bg-white/10 backdrop-blur-lg border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-venice-primary focus:border-transparent"
              />
              <Button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gradient-venice px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
              >
                <Search size={20} />
              </Button>
            </form>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-venice-accent">
                {isLoading ? "..." : stats?.totalApps || 0}
              </div>
              <div className="text-gray-400">Total Applications</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-venice-success">
                {isLoading ? "..." : stats?.developers || 0}
              </div>
              <div className="text-gray-400">Active Developers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-venice-secondary">
                {isLoading ? "..." : stats?.categories || 0}
              </div>
              <div className="text-gray-400">Categories</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
