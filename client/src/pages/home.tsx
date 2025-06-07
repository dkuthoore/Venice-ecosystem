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
      
      

      <FeaturedProjects />
      <Footer />
    </div>
  );
}
