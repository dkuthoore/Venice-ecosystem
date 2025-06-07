import { Link } from "wouter";
import { Github, ExternalLink } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";

export function Footer() {
  return (
    <footer className="bg-white border-t border-venice">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="mb-6">
              <div className="text-2xl font-serif italic text-venice-text mb-4">
                Venice
              </div>
              <p className="text-venice-light mb-6 max-w-md leading-relaxed">
                Discover and showcase applications built with Venice.ai's private, decentralized AI API. 
                Join the future of unrestricted artificial intelligence.
              </p>
            </div>
          </div>

          <div className="md:col-span-2 flex justify-center md:justify-end">
            <div className="flex items-center space-x-6">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-venice-light hover:text-venice-coral transition-colors"
                aria-label="GitHub"
              >
                <Github size={24} />
              </a>
              <a 
                href="https://x.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-venice-light hover:text-venice-coral transition-colors"
                aria-label="X (Twitter)"
              >
                <FaXTwitter size={24} />
              </a>
              <a 
                href="https://venice.ai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-venice-light hover:text-venice-coral transition-colors flex items-center"
                aria-label="Venice.ai"
              >
                <img src="/venice-logo.png" alt="Venice.ai" className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-venice pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-venice-light text-sm">Made by drkuthoore</p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-venice-light hover:text-venice-coral transition-colors text-sm">Privacy Policy</a>
              <a href="#" className="text-venice-light hover:text-venice-coral transition-colors text-sm">Terms of Service</a>
              <a href="#" className="text-venice-light hover:text-venice-coral transition-colors text-sm">Security</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
