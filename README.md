
# Venice.ai Application Directory

A community-driven platform for discovering and showcasing applications built with Venice.ai's private AI infrastructure. This full-stack web application serves as a centralized directory where developers can submit their Venice.ai-powered applications and users can explore innovative AI solutions.

## 🌟 Features

- **Application Discovery**: Browse and search through a curated collection of Venice.ai applications
- **Advanced Filtering**: Filter by categories, featured status, trending apps, and custom search terms
- **Project Submission**: Easy-to-use submission form for developers to showcase their applications
- **Detailed Project Pages**: Comprehensive project information including descriptions, screenshots, and developer details
- **Community Statistics**: Real-time stats showing total applications, developers, and categories
- **Approval Workflow**: Moderated submission process ensuring quality applications
- **Responsive Design**: Optimized for desktop and mobile devices
- **Real-time Updates**: Live data synchronization using TanStack Query

## 🏗️ Architecture

### Frontend
- **React 18** with TypeScript for type-safe component development
- **Vite** for fast development and optimized production builds
- **TanStack Query** for server state management and caching
- **Wouter** for lightweight client-side routing
- **Tailwind CSS** for utility-first styling
- **Radix UI** for accessible, unstyled component primitives
- **React Hook Form** with Zod validation for form handling
- **Lucide React** for consistent iconography

### Backend
- **Node.js** with **Express.js** for the REST API server
- **TypeScript** for end-to-end type safety
- **Drizzle ORM** for type-safe database operations
- **Neon Database** (PostgreSQL) for data persistence
- **Zod** for runtime schema validation
- Custom middleware for request logging and error handling

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Neon Database account (or PostgreSQL instance)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd venice-directory
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file with your database connection:
   ```env
   DATABASE_URL=your_neon_database_url
   ```

4. **Initialize the database**
   ```bash
   npm run db:push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5000`


## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes and ensure TypeScript compilation passes
4. Test your changes thoroughly
5. Submit a pull request with a clear description

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For issues, questions, or contributions, please open an issue on the repository or contact the development team.

---

Built with ❤️ by drkuthoore for the Venice.ai community
