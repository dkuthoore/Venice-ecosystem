
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

### Database Schema
```sql
categories: id, name, icon, slug
projects: id, name, description, shortDescription, developer, imageUrl, 
          externalUrl, githubUrl, categoryId, rating, featured flags, 
          tags[], status, timestamps
```

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

## 📝 API Endpoints

### Projects
- `GET /api/projects` - List projects with optional filtering
- `GET /api/projects/:id` - Get single project details
- `POST /api/projects` - Submit new project (requires validation)

### Categories
- `GET /api/categories` - List all categories

### Statistics
- `GET /api/stats` - Get community statistics

### Query Parameters (Projects)
- `categoryId` - Filter by category
- `search` - Text search in name/description
- `featured` - Show only featured projects
- `trending` - Show only trending projects
- `status` - Filter by approval status (defaults to 'approved')
- `sortBy` - Sort order (newest, oldest, etc.)

## 🛠️ Development

### Available Scripts
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run check` - TypeScript type checking
- `npm run db:push` - Push database schema changes

### Project Structure
```
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Route components
│   │   ├── lib/            # Utilities and configurations
│   │   └── hooks/          # Custom React hooks
├── server/                 # Express.js backend
│   ├── routes.ts           # API route definitions
│   ├── storage.ts          # Database operations
│   └── index.ts            # Server entry point
├── shared/                 # Shared types and schemas
└── attached_assets/        # Static asset storage
```

## 🎨 Design System

The application uses a custom design system built on Tailwind CSS with Venice.ai branding:

- **Colors**: Warm palette with Venice coral (#E85A4F) as primary
- **Typography**: Clean, readable fonts with proper hierarchy
- **Components**: Accessible Radix UI primitives with custom styling
- **Spacing**: Consistent spacing scale following Tailwind conventions

## 🔐 Security Features

- Input validation using Zod schemas
- SQL injection prevention via Drizzle ORM
- XSS protection through React's built-in escaping
- CORS configuration for production deployment
- Request logging and error handling middleware

## 📊 Database

The application uses a PostgreSQL database with the following key features:
- **Relational design** with proper foreign key constraints
- **JSONB support** for flexible tag storage
- **Indexing** on frequently queried fields
- **Timestamps** for audit trails
- **Status management** for content moderation

## 🚀 Deployment

This application is designed to be deployed on Replit:

1. **Production Build**
   ```bash
   npm run build
   ```

2. **Environment Setup**
   - Configure production database URL
   - Set NODE_ENV=production

3. **Start Production Server**
   ```bash
   npm start
   ```

The application serves both the API and static files on port 5000, which is configured for Replit's port forwarding.

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

Built with ❤️ for the Venice.ai community
