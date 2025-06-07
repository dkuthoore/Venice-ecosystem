import { db } from "./db";
import { categories, projects } from "@shared/schema";

async function seed() {
  console.log("🌱 Seeding database...");

  // Clear existing data
  await db.delete(projects);
  await db.delete(categories);

  // Create categories
  const categoryData = [
    { name: "Image Generation", icon: "🎨", slug: "image-generation" },
    { name: "Chat Interfaces", icon: "💬", slug: "chat-interfaces" },
    { name: "Developer Tools", icon: "🔧", slug: "developer-tools" },
    { name: "Document Analysis", icon: "📄", slug: "document-analysis" },
    { name: "AI Utilities", icon: "⚡", slug: "ai-utilities" },
  ];

  const insertedCategories = await db.insert(categories).values(categoryData).returning();
  console.log(`✅ Created ${insertedCategories.length} categories`);

  // Create projects with Venice.ai applications
  const projectData = [
    {
      name: "Standalone Image Upscaler/Enhancer",
      description: "A specialized application focused exclusively on image upscaling and enhancing using Venice's advanced AI models. This streamlined tool provides an intuitive interface for improving image quality and resolution, making it accessible to users who need professional-grade image enhancement without the complexity of full image generation suites. Features include batch processing, multiple upscaling algorithms, noise reduction, and quality optimization.",
      shortDescription: "Specialized tool for AI-powered image upscaling and enhancement with professional-grade results.",
      developer: "ImageTech Solutions",
      developerEmail: "contact@imagetech.solutions",
      developerTwitter: "@ImageTechAI",
      developerGithub: "imagetech-solutions",
      developerWebsite: "https://imagetech.solutions",
      imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      externalUrl: "https://upscaler.venice.ai",
      githubUrl: "https://github.com/venice-ai/image-upscaler",
      categoryId: insertedCategories.find(c => c.slug === "image-generation")!.id,
      rating: 47,
      isFeatured: true,
      isNew: false,
      isTrending: true,
      tags: ["Image Enhancement", "Upscaling", "AI Processing", "Batch Processing"],
      status: "approved",
    },
    {
      name: "Automatic1111 Integration",
      description: "A comprehensive Venice.ai integration for the popular Automatic1111 UI, allowing users to access Venice's powerful image models through the familiar and feature-rich Automatic1111 interface. This integration expands Venice's reach to an established community of image generation enthusiasts who already understand and rely on this sophisticated platform. Includes full compatibility with existing workflows, custom model support, and advanced parameter controls.",
      shortDescription: "Venice.ai integration for Automatic1111 UI with full workflow compatibility.",
      developer: "VeniceUI Collective",
      developerEmail: "team@veniceui.dev",
      developerTwitter: "@VeniceUITeam",
      developerGithub: "venice-ui-collective",
      developerWebsite: "https://veniceui.dev",
      imageUrl: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      externalUrl: "https://auto1111.venice.ai",
      githubUrl: "https://github.com/venice-ai/automatic1111-integration",
      categoryId: insertedCategories.find(c => c.slug === "image-generation")!.id,
      rating: 48,
      isFeatured: true,
      isNew: false,
      isTrending: false,
      tags: ["Automatic1111", "Integration", "Advanced Controls", "Community"],
      status: "approved",
    },
    {
      name: "Advanced Image Studio",
      description: "A comprehensive standalone image generation application that rivals Automatic1111 but is built specifically for Venice.ai's ecosystem. This sophisticated tool includes all the advanced controls, features, and professional-grade interface that experienced users expect from image generation software. Features include prompt engineering tools, style presets, batch generation, advanced parameter controls, and integrated workflow management.",
      shortDescription: "Professional-grade standalone image generation studio with advanced controls.",
      developer: "Venice Studios",
      developerEmail: "studio@venice.ai",
      developerTwitter: "@VeniceStudios",
      developerGithub: "venice-studios",
      developerWebsite: "https://studio.venice.ai",
      imageUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      externalUrl: "https://studio.venice.ai",
      githubUrl: "https://github.com/venice-ai/advanced-image-studio",
      categoryId: insertedCategories.find(c => c.slug === "image-generation")!.id,
      rating: 49,
      isFeatured: true,
      isNew: true,
      isTrending: true,
      tags: ["Professional Tools", "Advanced Interface", "Workflow Management", "Studio"],
      status: "approved",
    },
    {
      name: "Retro 80's Cyberpunk Chat Interface",
      description: "A visually distinctive alternative interface for Venice chat featuring a stunning retro 80's cyberpunk aesthetic. This specialized interface offers a curated subset of Venice's features wrapped in an immersive visual experience that transports users to a neon-lit digital world. Perfect for users who want a unique and atmospheric way to interact with AI, featuring custom animations, retro sound effects, and a carefully crafted user experience.",
      shortDescription: "Immersive retro cyberpunk chat interface with stunning 80's aesthetics.",
      developer: "Neon Dreams Interactive",
      developerEmail: "hello@neondreams.io",
      developerTwitter: "@NeonDreamsIO",
      developerGithub: "neon-dreams-interactive",
      developerWebsite: "https://neondreams.io",
      imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      externalUrl: "https://retro.venice.ai",
      githubUrl: "https://github.com/venice-ai/retro-chat-interface",
      categoryId: insertedCategories.find(c => c.slug === "chat-interfaces")!.id,
      rating: 46,
      isFeatured: false,
      isNew: true,
      isTrending: false,
      tags: ["Retro Design", "Cyberpunk", "Alternative UI", "Interactive"],
      status: "approved",
    },
    {
      name: "PDF Intelligence Tool",
      description: "A sophisticated side-by-side PDF reading and AI assistance tool, similar to what Cursor provides for code but specifically designed for documents and books. This powerful application allows users to upload PDFs and engage with AI assistance while reading, enabling deep document analysis, question answering, summarization, and insight extraction. Perfect for researchers, students, and professionals who need to quickly understand and analyze complex documents.",
      shortDescription: "AI-powered PDF analysis tool with side-by-side reading and intelligent assistance.",
      developer: "DocuMind AI",
      developerEmail: "support@documind.ai",
      developerTwitter: "@DocuMindAI",
      developerGithub: "documind-ai",
      developerWebsite: "https://documind.ai",
      imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      externalUrl: "https://pdf.venice.ai",
      githubUrl: "https://github.com/venice-ai/pdf-intelligence-tool",
      categoryId: insertedCategories.find(c => c.slug === "document-analysis")!.id,
      rating: 48,
      isFeatured: false,
      isNew: false,
      isTrending: true,
      tags: ["Document Analysis", "PDF Processing", "Research Tools", "AI Assistant"],
      status: "approved",
    },
  ];

  const insertedProjects = await db.insert(projects).values(projectData).returning();
  console.log(`✅ Created ${insertedProjects.length} projects`);

  console.log("🎉 Database seeded successfully!");
}

seed().catch((error) => {
  console.error("❌ Error seeding database:", error);
  process.exit(1);
});