import { Link } from "wouter";

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

          <div>
            <h3 className="text-sm font-semibold text-venice-text tracking-wider uppercase mb-4">Platform</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-venice-light hover:text-venice-coral transition-colors text-sm">Applications</Link></li>
              <li><Link href="/submit" className="text-venice-light hover:text-venice-coral transition-colors text-sm">Submit App</Link></li>
              <li><a href="#" className="text-venice-light hover:text-venice-coral transition-colors text-sm">API Access</a></li>
              <li><a href="#" className="text-venice-light hover:text-venice-coral transition-colors text-sm">Documentation</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-venice-text tracking-wider uppercase mb-4">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-venice-light hover:text-venice-coral transition-colors text-sm">About</a></li>
              <li><a href="#" className="text-venice-light hover:text-venice-coral transition-colors text-sm">Blog</a></li>
              <li><a href="#" className="text-venice-light hover:text-venice-coral transition-colors text-sm">Careers</a></li>
              <li><a href="#" className="text-venice-light hover:text-venice-coral transition-colors text-sm">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-venice pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-venice-light text-sm">© 2024 Venice.ai. All rights reserved.</p>
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
