import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Directory", href: "/directory" },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-lg border-b border-venice sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-3">
              <div className="text-2xl font-serif italic text-venice-text">
                Venice
              </div>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`transition-colors text-sm font-medium ${
                  location === item.href
                    ? "text-venice-coral"
                    : "text-venice-text hover:text-venice-coral"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <Link href="/submit">
              <Button className="bg-[#E85A4F] hover:bg-[#E85A4F]/90 text-white font-medium transition-all rounded-full px-6 py-2">
                Submit App →
              </Button>
            </Link>
            <Button className="bg-[#E85A4F] hover:bg-[#E85A4F]/90 text-white rounded-full px-4 py-2">
              Sign in
            </Button>
            <button
              className="md:hidden text-venice-text hover:text-venice-coral"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-venice">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-venice-text hover:text-venice-coral transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
