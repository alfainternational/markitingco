# MarketingCo Platform - Technical Architecture
# البنية التقنية لمنصة ماركتنج كو

**Version 1.0 | نسخة 1.0**
**Last Updated: January 2026**

---

## 1. TECHNOLOGY STACK | المجموعة التقنية

### Frontend | الواجهة الأمامية
```
- Framework: Next.js 14.x (App Router)
- Language: TypeScript 5.x
- Styling: Tailwind CSS 3.x
- UI Components: shadcn/ui + Radix UI
- State Management: Zustand + React Query
- Forms: React Hook Form + Zod
- Charts: Recharts + Chart.js
- Icons: Lucide React
- Animations: Framer Motion
- Rich Text: Tiptap Editor
```

### Backend | الخلفية
```
- Runtime: Node.js 20.x
- Framework: Next.js API Routes + Express.js
- Language: TypeScript 5.x
- API Style: RESTful + GraphQL (Apollo)
- Authentication: NextAuth.js v5
- Authorization: CASL (Permission Management)
- Validation: Zod
- File Upload: UploadThing
```

### Database | قاعدة البيانات
```
- Primary DB: PostgreSQL 16.x
- ORM: Prisma 5.x
- Caching: Redis 7.x
- Search: Elasticsearch 8.x
- File Storage: AWS S3 / Cloudflare R2
- CDN: Cloudflare
```

### DevOps & Infrastructure | البنية التحتية
```
- Hosting: Vercel (Frontend) + AWS (Backend)
- CI/CD: GitHub Actions
- Monitoring: Sentry + Vercel Analytics
- Logging: Winston + CloudWatch
- Containerization: Docker + Docker Compose
- Email: Resend / SendGrid
- SMS: Twilio
```

### Third-Party Integrations | التكاملات الخارجية
```
- Payment: Stripe + PayPal
- CRM: Custom Built (with HubSpot API integration option)
- Analytics: Google Analytics 4 + Mixpanel
- Social Media: Meta Business API, LinkedIn API
- Advertising: Google Ads API, Meta Ads API
- Email Marketing: SendGrid API
- Calendar: Google Calendar API
- Video Conferencing: Zoom API
- Cloud Storage: AWS S3
- SMS: Twilio
```

---

## 2. SYSTEM ARCHITECTURE | بنية النظام

### High-Level Architecture | البنية العامة

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Web App     │  │  Admin Panel │  │  Mobile Web  │      │
│  │  (Next.js)   │  │  (Next.js)   │  │  (PWA)       │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      CDN & EDGE LAYER                        │
│                    (Cloudflare / Vercel)                     │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    APPLICATION LAYER                         │
│  ┌──────────────────────────────────────────────────────┐  │
│  │           Next.js API Routes + Server Actions         │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │ Auth Service │  │ CRM Service  │  │ Campaign Mgmt│    │
│  └──────────────┘  └──────────────┘  └──────────────┘    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │ Payment Svc  │  │Analytics Svc │  │ Notification │    │
│  └──────────────┘  └──────────────┘  └──────────────┘    │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                       DATA LAYER                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  PostgreSQL  │  │    Redis     │  │Elasticsearch │     │
│  │  (Primary)   │  │   (Cache)    │  │   (Search)   │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│  ┌──────────────┐  ┌──────────────┐                       │
│  │   AWS S3     │  │  Cloud Queue │                       │
│  │  (Storage)   │  │   (Jobs)     │                       │
│  └──────────────┘  └──────────────┘                       │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                 EXTERNAL SERVICES LAYER                      │
│  Google Ads │ Meta Ads │ Stripe │ SendGrid │ Twilio        │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. DATABASE SCHEMA | مخطط قاعدة البيانات

### Core Tables | الجداول الأساسية

```sql
-- Users & Authentication
users
├── id (uuid, PK)
├── email (unique)
├── password_hash
├── name
├── role (admin, agency_staff, client)
├── avatar_url
├── phone
├── status (active, inactive, suspended)
├── created_at
├── updated_at
└── last_login

-- Organizations (Clients)
organizations
├── id (uuid, PK)
├── name
├── slug (unique)
├── industry
├── website
├── logo_url
├── billing_email
├── tax_id
├── address
├── plan_type (starter, growth, enterprise)
├── status
├── created_at
└── updated_at

-- Projects & Campaigns
projects
├── id (uuid, PK)
├── organization_id (FK)
├── name
├── description
├── type (seo, ppc, social, content, etc.)
├── status (active, paused, completed)
├── budget
├── start_date
├── end_date
├── assigned_team
├── created_by
├── created_at
└── updated_at

campaigns
├── id (uuid, PK)
├── project_id (FK)
├── name
├── platform (google_ads, facebook, linkedin, etc.)
├── objective
├── budget_daily
├── budget_total
├── status
├── metrics (jsonb)
├── start_date
├── end_date
├── created_at
└── updated_at

-- Tasks & Workflow
tasks
├── id (uuid, PK)
├── project_id (FK)
├── title
├── description
├── assigned_to (FK users)
├── status (todo, in_progress, review, done)
├── priority (low, medium, high, urgent)
├── due_date
├── tags
├── created_by
├── created_at
└── updated_at

-- Content Management
content_items
├── id (uuid, PK)
├── project_id (FK)
├── type (blog, social_post, email, ad_copy)
├── title
├── content (text)
├── status (draft, review, approved, published)
├── platform
├── scheduled_date
├── published_date
├── performance_metrics (jsonb)
├── created_by
├── created_at
└── updated_at

-- Analytics & Reporting
analytics_data
├── id (uuid, PK)
├── project_id (FK)
├── date
├── platform
├── metric_type
├── metric_value
├── dimensions (jsonb)
├── created_at
└── synced_at

reports
├── id (uuid, PK)
├── project_id (FK)
├── title
├── type (weekly, monthly, quarterly, custom)
├── period_start
├── period_end
├── data (jsonb)
├── pdf_url
├── generated_by
├── generated_at
└── sent_to_client_at

-- Financial Management
invoices
├── id (uuid, PK)
├── organization_id (FK)
├── invoice_number (unique)
├── amount
├── currency
├── status (draft, sent, paid, overdue, cancelled)
├── due_date
├── paid_date
├── line_items (jsonb)
├── notes
├── created_at
└── updated_at

payments
├── id (uuid, PK)
├── invoice_id (FK)
├── amount
├── currency
├── method (stripe, paypal, bank_transfer)
├── transaction_id
├── status
├── processed_at
└── created_at

-- Communication
messages
├── id (uuid, PK)
├── conversation_id (FK)
├── sender_id (FK users)
├── content
├── attachments (jsonb)
├── read_at
├── created_at
└── updated_at

notifications
├── id (uuid, PK)
├── user_id (FK)
├── type
├── title
├── message
├── link
├── read_at
└── created_at

-- Services Catalog
services
├── id (uuid, PK)
├── name
├── slug
├── description
├── category
├── pricing_model (fixed, hourly, retainer, performance)
├── base_price
├── features (jsonb)
├── is_active
├── created_at
└── updated_at

-- Proposals & Contracts
proposals
├── id (uuid, PK)
├── organization_id (FK)
├── title
├── description
├── services (jsonb)
├── total_amount
├── status (draft, sent, accepted, rejected)
├── valid_until
├── sent_at
├── accepted_at
├── created_by
├── created_at
└── updated_at
```

---

## 4. API STRUCTURE | بنية API

### API Endpoints | نقاط النهاية

```
/api/v1/
├── auth/
│   ├── POST   /register
│   ├── POST   /login
│   ├── POST   /logout
│   ├── POST   /refresh
│   ├── POST   /forgot-password
│   └── POST   /reset-password
│
├── users/
│   ├── GET    /me
│   ├── PATCH  /me
│   ├── GET    /users
│   ├── GET    /users/:id
│   ├── POST   /users
│   ├── PATCH  /users/:id
│   └── DELETE /users/:id
│
├── organizations/
│   ├── GET    /organizations
│   ├── GET    /organizations/:id
│   ├── POST   /organizations
│   ├── PATCH  /organizations/:id
│   └── DELETE /organizations/:id
│
├── projects/
│   ├── GET    /projects
│   ├── GET    /projects/:id
│   ├── POST   /projects
│   ├── PATCH  /projects/:id
│   ├── DELETE /projects/:id
│   └── GET    /projects/:id/analytics
│
├── campaigns/
│   ├── GET    /campaigns
│   ├── GET    /campaigns/:id
│   ├── POST   /campaigns
│   ├── PATCH  /campaigns/:id
│   ├── DELETE /campaigns/:id
│   └── GET    /campaigns/:id/metrics
│
├── tasks/
│   ├── GET    /tasks
│   ├── GET    /tasks/:id
│   ├── POST   /tasks
│   ├── PATCH  /tasks/:id
│   └── DELETE /tasks/:id
│
├── content/
│   ├── GET    /content
│   ├── GET    /content/:id
│   ├── POST   /content
│   ├── PATCH  /content/:id
│   ├── DELETE /content/:id
│   └── POST   /content/:id/publish
│
├── analytics/
│   ├── GET    /analytics/overview
│   ├── GET    /analytics/projects/:id
│   ├── GET    /analytics/campaigns/:id
│   └── POST   /analytics/sync
│
├── reports/
│   ├── GET    /reports
│   ├── GET    /reports/:id
│   ├── POST   /reports/generate
│   └── POST   /reports/:id/send
│
├── invoices/
│   ├── GET    /invoices
│   ├── GET    /invoices/:id
│   ├── POST   /invoices
│   ├── PATCH  /invoices/:id
│   └── POST   /invoices/:id/send
│
├── payments/
│   ├── POST   /payments/create-intent
│   ├── POST   /payments/confirm
│   └── GET    /payments/:id
│
├── services/
│   ├── GET    /services
│   ├── GET    /services/:slug
│   └── POST   /services/quote
│
├── proposals/
│   ├── GET    /proposals
│   ├── GET    /proposals/:id
│   ├── POST   /proposals
│   ├── PATCH  /proposals/:id
│   └── POST   /proposals/:id/accept
│
├── messages/
│   ├── GET    /conversations
│   ├── GET    /conversations/:id/messages
│   └── POST   /conversations/:id/messages
│
├── notifications/
│   ├── GET    /notifications
│   ├── PATCH  /notifications/:id/read
│   └── PATCH  /notifications/read-all
│
└── integrations/
    ├── POST   /google-ads/connect
    ├── POST   /facebook/connect
    ├── GET    /google-ads/campaigns
    └── GET    /facebook/campaigns
```

---

## 5. FRONTEND STRUCTURE | بنية الواجهة الأمامية

### Directory Structure | هيكل المجلدات

```
marketingco-platform/
├── app/                          # Next.js App Router
│   ├── (auth)/                  # Auth routes
│   │   ├── login/
│   │   ├── register/
│   │   └── forgot-password/
│   ├── (marketing)/             # Public marketing pages
│   │   ├── page.tsx            # Homepage
│   │   ├── services/
│   │   ├── about/
│   │   ├── contact/
│   │   ├── pricing/
│   │   └── blog/
│   ├── (dashboard)/            # Protected dashboard
│   │   ├── dashboard/
│   │   ├── projects/
│   │   ├── campaigns/
│   │   ├── content/
│   │   ├── analytics/
│   │   ├── reports/
│   │   ├── clients/
│   │   ├── team/
│   │   ├── invoices/
│   │   └── settings/
│   ├── api/                    # API routes
│   │   ├── auth/
│   │   ├── projects/
│   │   ├── campaigns/
│   │   └── [other endpoints]/
│   ├── layout.tsx
│   └── globals.css
│
├── components/                  # React components
│   ├── ui/                     # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   └── [other ui]/
│   ├── layout/                 # Layout components
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Footer.tsx
│   │   └── DashboardLayout.tsx
│   ├── dashboard/              # Dashboard components
│   │   ├── StatsCard.tsx
│   │   ├── RecentActivity.tsx
│   │   └── QuickActions.tsx
│   ├── projects/               # Project components
│   │   ├── ProjectCard.tsx
│   │   ├── ProjectList.tsx
│   │   └── ProjectForm.tsx
│   ├── campaigns/              # Campaign components
│   │   ├── CampaignCard.tsx
│   │   ├── CampaignMetrics.tsx
│   │   └── CampaignForm.tsx
│   ├── analytics/              # Analytics components
│   │   ├── AnalyticsChart.tsx
│   │   ├── MetricsCard.tsx
│   │   └── PerformanceTable.tsx
│   └── [other domains]/
│
├── lib/                        # Utilities & helpers
│   ├── prisma.ts              # Prisma client
│   ├── auth.ts                # Auth utilities
│   ├── api-client.ts          # API client
│   ├── utils.ts               # General utilities
│   └── validations.ts         # Zod schemas
│
├── hooks/                      # Custom React hooks
│   ├── useUser.ts
│   ├── useProjects.ts
│   ├── useCampaigns.ts
│   └── [other hooks]/
│
├── store/                      # State management
│   ├── auth-store.ts
│   ├── ui-store.ts
│   └── [other stores]/
│
├── types/                      # TypeScript types
│   ├── api.ts
│   ├── database.ts
│   └── [other types]/
│
├── prisma/                     # Prisma schema & migrations
│   ├── schema.prisma
│   └── migrations/
│
├── public/                     # Static assets
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── config/                     # Configuration files
│   ├── site.ts
│   └── constants.ts
│
├── .env.example
├── .env.local
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## 6. KEY FEATURES | الميزات الرئيسية

### For Clients | للعملاء
- ✅ Client Portal with Dashboard
- ✅ Project & Campaign Overview
- ✅ Real-time Analytics & Reports
- ✅ Content Calendar & Approval
- ✅ Messaging & Communication
- ✅ Invoice & Payment Management
- ✅ Document Library
- ✅ Mobile-Responsive Interface

### For Agency Team | لفريق الوكالة
- ✅ Client Management (CRM)
- ✅ Project & Task Management
- ✅ Campaign Creation & Management
- ✅ Content Planning & Publishing
- ✅ Team Collaboration Tools
- ✅ Time Tracking
- ✅ Reporting & Analytics
- ✅ Invoicing & Financial Management

### For Admins | للمسؤولين
- ✅ User & Role Management
- ✅ Service Catalog Management
- ✅ Pricing & Plans Management
- ✅ System Configuration
- ✅ Analytics & Insights
- ✅ Integration Management

---

## 7. SECURITY MEASURES | إجراءات الأمان

```
- Authentication: JWT + HTTP-only cookies
- Password Hashing: bcrypt (10 rounds)
- Rate Limiting: Express rate limit + Redis
- CORS: Configured for specific origins
- CSRF Protection: Double-submit cookie pattern
- SQL Injection Prevention: Prisma ORM (parameterized queries)
- XSS Prevention: DOMPurify + Content Security Policy
- Data Encryption: AES-256 for sensitive data at rest
- HTTPS: Enforced SSL/TLS
- API Key Management: Encrypted storage
- File Upload: Type & size validation, virus scanning
- Session Management: Redis-backed sessions
- Audit Logging: All critical actions logged
- 2FA: Optional TOTP-based 2FA
- Role-Based Access Control (RBAC)
```

---

## 8. PERFORMANCE OPTIMIZATION | تحسين الأداء

```
- Server-Side Rendering (SSR) for public pages
- Static Site Generation (SSG) where applicable
- Image Optimization: Next.js Image component
- Code Splitting: Automatic with Next.js
- Lazy Loading: React.lazy for components
- Database Query Optimization: Prisma relations & indexing
- Redis Caching: API responses & session data
- CDN: Static assets via Cloudflare
- Compression: Gzip/Brotli
- Bundle Analysis: webpack-bundle-analyzer
- API Response Pagination
- Database Connection Pooling
```

---

## 9. MONITORING & ANALYTICS | المراقبة والتحليلات

```
- Error Tracking: Sentry
- Performance Monitoring: Vercel Analytics
- Application Logs: Winston + CloudWatch
- Database Monitoring: Prisma metrics
- Uptime Monitoring: UptimeRobot
- User Analytics: Google Analytics 4 + Mixpanel
- A/B Testing: Vercel Edge Config
- Real-time Monitoring: Grafana + Prometheus
```

---

## 10. DEPLOYMENT STRATEGY | استراتيجية النشر

### Environments | البيئات
```
- Development: Local + Docker Compose
- Staging: Vercel Preview Deployments
- Production: Vercel (Frontend) + AWS (Backend)
```

### CI/CD Pipeline | خط النشر المستمر
```
1. Code Push to GitHub
2. GitHub Actions triggered
3. Run linting & type checking
4. Run unit tests
5. Build application
6. Deploy to staging (on PR)
7. Run E2E tests
8. Deploy to production (on merge to main)
9. Notify team via Slack
```

---

## 11. THIRD-PARTY INTEGRATIONS | التكاملات الخارجية

### Marketing Platforms | منصات التسويق
- ✅ Google Ads API (Campaign management & reporting)
- ✅ Meta Business API (Facebook & Instagram ads)
- ✅ LinkedIn Marketing API
- ✅ TikTok Ads API
- ✅ Google Analytics 4 API
- ✅ Google Search Console API
- ✅ Mailchimp/SendGrid API

### Payment Gateways | بوابات الدفع
- ✅ Stripe (Primary)
- ✅ PayPal (Secondary)
- ✅ Bank Transfer (Manual)

### Communication | الاتصالات
- ✅ SendGrid (Transactional emails)
- ✅ Twilio (SMS notifications)
- ✅ Slack (Team notifications)
- ✅ Zoom API (Video meetings)

### Storage & CDN | التخزين
- ✅ AWS S3 (File storage)
- ✅ Cloudflare (CDN & DDoS protection)

---

## 12. SCALABILITY PLAN | خطة القابلية للتوسع

### Phase 1: MVP (0-100 clients)
- Single-server deployment
- Basic caching with Redis
- Standard PostgreSQL instance

### Phase 2: Growth (100-1000 clients)
- Load balancer implementation
- Database read replicas
- Horizontal scaling of API servers
- CDN for global content delivery

### Phase 3: Enterprise (1000+ clients)
- Microservices architecture
- Database sharding
- Message queue (RabbitMQ/SQS)
- Multi-region deployment
- Advanced caching strategies

---

## 13. BACKUP & DISASTER RECOVERY | النسخ الاحتياطي والاستعادة

```
- Database Backups: Daily automated backups (retained 30 days)
- Incremental Backups: Every 6 hours
- Point-in-Time Recovery: Available for last 7 days
- File Storage Backups: Versioned S3 buckets
- Configuration Backups: Version controlled in Git
- Disaster Recovery Plan: RTO: 4 hours, RPO: 1 hour
- Backup Testing: Monthly restoration tests
```

---

## 14. COMPLIANCE & DATA PRIVACY | الامتثال وخصوصية البيانات

```
- GDPR Compliance (for EU clients)
- Data encryption at rest and in transit
- Right to be forgotten (data deletion)
- Data export functionality
- Privacy policy & Terms of service
- Cookie consent management
- Audit trails for data access
- Regular security audits
```

---

**Document Control:**
- Version: 1.0
- Created: January 2026
- Owner: CTO, MarketingCo
- Classification: Technical - Architecture Document
