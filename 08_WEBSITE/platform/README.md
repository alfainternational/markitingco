# MarketingCo Platform

A comprehensive digital marketing agency platform built with Next.js 14, TypeScript, Prisma, and PostgreSQL.

## 🚀 Features

### For Clients
- **Client Portal**: Secure dashboard to view projects, campaigns, and analytics
- **Real-time Analytics**: Live performance metrics and insights
- **Project Management**: Track progress and milestones
- **Content Approval**: Review and approve content before publication
- **Invoice Management**: View and pay invoices online
- **Communication**: Direct messaging with your account manager

### For Agency Team
- **Client Management (CRM)**: Comprehensive client relationship management
- **Project & Campaign Management**: Organize and track all marketing activities
- **Content Planning & Publishing**: Content calendar and scheduling
- **Team Collaboration**: Task assignment and workflow management
- **Analytics Dashboard**: Unified view of all campaign performance
- **Financial Management**: Invoicing, payments, and reporting

### For Admins
- **User & Role Management**: Complete access control system
- **Service Catalog**: Manage services and pricing
- **System Configuration**: Platform settings and integrations
- **Audit Logs**: Track all system activities

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + Radix UI
- **State Management**: Zustand + React Query
- **Forms**: React Hook Form + Zod

### Backend
- **Runtime**: Node.js 20
- **Framework**: Next.js API Routes
- **Database**: PostgreSQL 16
- **ORM**: Prisma 5
- **Authentication**: NextAuth.js v5
- **Caching**: Redis

### DevOps
- **Hosting**: Vercel (Frontend) + AWS (Backend)
- **CI/CD**: GitHub Actions
- **Monitoring**: Sentry + Vercel Analytics

## 📦 Installation

### Prerequisites
- Node.js 20 or higher
- PostgreSQL 16 or higher
- Redis (for caching)
- npm or yarn or pnpm

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/marketingco/platform.git
cd platform
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Environment Variables**
Copy `.env.example` to `.env.local` and fill in the values:
```bash
cp .env.example .env.local
```

Required environment variables:
- `DATABASE_URL`: PostgreSQL connection string
- `NEXTAUTH_URL`: Your app URL
- `NEXTAUTH_SECRET`: Secret for NextAuth (generate with `openssl rand -base64 32`)
- `REDIS_URL`: Redis connection string

4. **Database Setup**
```bash
# Generate Prisma Client
npm run db:generate

# Run migrations
npm run db:migrate

# (Optional) Seed database with sample data
npm run db:seed
```

5. **Run Development Server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
platform/
├── app/                      # Next.js App Router
│   ├── (auth)/              # Authentication routes
│   ├── (marketing)/         # Public marketing pages
│   ├── (dashboard)/         # Protected dashboard
│   ├── api/                 # API routes
│   ├── globals.css          # Global styles
│   └── layout.tsx           # Root layout
├── components/              # React components
│   ├── ui/                  # UI components (shadcn/ui)
│   ├── layout/              # Layout components
│   ├── dashboard/           # Dashboard components
│   └── ...                  # Feature-specific components
├── lib/                     # Utilities & helpers
│   ├── prisma.ts           # Prisma client
│   ├── auth.ts             # Auth utilities
│   ├── utils.ts            # General utilities
│   └── validations.ts      # Zod schemas
├── hooks/                   # Custom React hooks
├── store/                   # State management (Zustand)
├── types/                   # TypeScript types
├── prisma/                  # Prisma schema & migrations
│   ├── schema.prisma       # Database schema
│   └── migrations/         # Database migrations
├── config/                  # Configuration files
│   └── site.ts             # Site configuration
├── public/                  # Static assets
├── .env.example            # Environment variables template
├── next.config.js          # Next.js configuration
├── tailwind.config.ts      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies

```

## 📚 Key Concepts

### Authentication
The platform uses NextAuth.js v5 for authentication with support for:
- Email/Password login
- OAuth providers (Google, etc.)
- Role-based access control (RBAC)
- Session management

### Database Schema
Key entities:
- **User**: System users (admins, staff, clients)
- **Organization**: Client organizations
- **Project**: Marketing projects
- **Campaign**: Marketing campaigns
- **Task**: Project tasks
- **ContentItem**: Content pieces (blog posts, social posts, etc.)
- **Invoice**: Billing invoices
- **Payment**: Payment records
- **Report**: Analytics reports

### API Structure
All API endpoints follow RESTful conventions:
- `GET /api/v1/projects` - List projects
- `GET /api/v1/projects/:id` - Get project
- `POST /api/v1/projects` - Create project
- `PATCH /api/v1/projects/:id` - Update project
- `DELETE /api/v1/projects/:id` - Delete project

### Authorization
Role-based permissions:
- **SUPER_ADMIN**: Full system access
- **ADMIN**: Agency admin access
- **AGENCY_MANAGER**: Manage clients and projects
- **ACCOUNT_MANAGER**: Manage assigned clients
- **CONTENT_CREATOR**: Create and manage content
- **ANALYST**: View analytics and create reports
- **CLIENT**: View own projects and data

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run tests in watch mode
npm run test:watch

# Run E2E tests
npm run test:e2e
```

## 🚀 Deployment

### Vercel (Recommended for Frontend)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Docker
```bash
# Build image
docker build -t marketingco-platform .

# Run container
docker run -p 3000:3000 marketingco-platform
```

## 📖 Documentation

- [User Guide](./docs/user-guide.md)
- [Admin Guide](./docs/admin-guide.md)
- [API Documentation](./docs/api.md)
- [Database Schema](./docs/schema.md)
- [Contributing Guide](./CONTRIBUTING.md)

## 🔒 Security

- All passwords are hashed using bcrypt
- JWT tokens for API authentication
- CORS protection
- Rate limiting on API endpoints
- Input validation with Zod
- SQL injection prevention (Prisma ORM)
- XSS prevention
- CSRF protection

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

## 📝 License

This project is proprietary software owned by MarketingCo.

## 📧 Support

For support, email support@marketingco.com or join our Slack channel.

---

**Built with ❤️ by the MarketingCo Team**
