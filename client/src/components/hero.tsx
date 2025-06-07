import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import type { Stats } from "@/lib/types";

export function Hero() {
  const { data: stats, isLoading } = useQuery<Stats>({
    queryKey: ["/api/stats"],
  });

  return (
    <section className="relative py-8 overflow-hidden bg-gradient-warm">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 25%, #f3f1ed 0%, transparent 50%), radial-gradient(circle at 75% 75%, #f8f6f2 0%, transparent 50%)",
          }}
        ></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mb-8">
            <div className="w-16 h-16 mx-auto mb-6 bg-venice-coral rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L3 7v10c0 5.55 3.84 9.74 9 10.86C17.16 26.74 21 22.55 21 17V7l-9-5z" />
              </svg>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-venice-text leading-tight">
            <span className="block font-serif italic text-venice-coral">
              Venice.ai Ecosystem Apps
            </span>
          </h1>

          <p className="text-xl text-venice-light mb-12 max-w-3xl mx-auto leading-relaxed">
            Discover and showcase applications built with Venice.ai's private AI
            infrastructure.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/directory">
              <Button className="bg-[#E85A4F] hover:bg-[#E85A4F]/90 text-white font-medium transition-all rounded-full px-8 py-3">
                Browse Apps
              </Button>
            </Link>
            <Link href="/submit">
              <Button
                variant="outline"
                className="border-[#E85A4F] text-[#E85A4F] hover:bg-[#E85A4F] hover:text-white rounded-full px-8 py-3"
              >
                Submit Your App
              </Button>
            </Link>
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
