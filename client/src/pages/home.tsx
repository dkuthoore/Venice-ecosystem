import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { FeaturedProjects } from "@/components/featured-projects";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-venice-warm text-venice-text">
      <Header />
      <Hero />
      <FeaturedProjects />
      <Footer />
    </div>
  );
}