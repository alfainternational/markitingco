# CLAUDE.md - AI Assistant Guide for markitingco

**Last Updated:** 2026-01-23
**Project Status:** Planning & Architecture Phase
**Repository:** alfainternational/markitingco

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Virtual Agency Architecture](#virtual-agency-architecture)
3. [Repository Status](#repository-status)
4. [Development Workflow](#development-workflow)
5. [Codebase Structure](#codebase-structure)
6. [Git Conventions](#git-conventions)
7. [Code Standards](#code-standards)
8. [Testing Guidelines](#testing-guidelines)
9. [Documentation Standards](#documentation-standards)
10. [AI Assistant Guidelines](#ai-assistant-guidelines)
11. [Common Tasks](#common-tasks)

---

## Project Overview

### About markitingco

**Project Name:** markitingco
**Type:** Virtual Digital Marketing Agency Platform
**Purpose:** A comprehensive, professional virtual digital marketing agency that serves all business levels

**Vision:**
markitingco is an innovative digital platform that simulates a complete marketing agency experience. When users enter the website, they interact with a fully-functional virtual agency complete with:

- **Virtual Staff Members**: AI-powered team members (project managers, content creators, designers, analysts, etc.)
- **Workflow Management**: Complete task tracking and assignment system
- **File Management**: Creation, storage, and versioning of all marketing deliverables
- **Report Generation**: Automated and manual reporting system with detailed analytics
- **Task Progression**: Visual tracking of work progress through different stages
- **Role-Based Operations**: Each virtual team member has specific responsibilities and outputs

### Core Concept

The platform provides a transparent, end-to-end view of marketing operations where clients can:

1. **See Who Does What**: Clear assignment of tasks to specific virtual team members
2. **Track File Creation**: Monitor when and how files are created at each stage
3. **Access Reports**: View detailed reports from each department/role
4. **Follow Workflows**: Understand the complete journey from brief to delivery
5. **Review Deliverables**: Access all files, documents, and creative assets
6. **Monitor Timelines**: Track deadlines and completion status

### Target Audience

- **Small Businesses**: Affordable access to comprehensive marketing services
- **Medium Enterprises**: Scalable marketing solutions with full transparency
- **Large Corporations**: Enterprise-level campaign management and reporting
- **Startups**: All-in-one marketing platform without hiring a full team
- **Entrepreneurs**: Self-service marketing with professional guidance

### Technology Stack

**Status:** Planning Phase - Proposed Stack:

**Frontend:**
- React.js or Next.js for dynamic UI
- TypeScript for type safety
- Tailwind CSS for styling
- State Management: Redux or Zustand
- Real-time updates: WebSockets or Server-Sent Events

**Backend:**
- Node.js with Express or NestJS
- TypeScript throughout
- Database: PostgreSQL for relational data
- File Storage: AWS S3 or similar cloud storage
- Queue System: Redis or RabbitMQ for task processing

**AI/Automation:**
- OpenAI API for virtual team member interactions
- Custom AI workflows for marketing automation
- Template engines for report generation
- Document generation libraries (PDFKit, etc.)

**Additional Tools:**
- Authentication: JWT with OAuth2
- Real-time collaboration features
- Analytics dashboard
- Email notification system
- API documentation: Swagger/OpenAPI

### Current State

**Phase:** Architecture & Planning

As of the last update:
- Project vision and concept defined
- Architecture planning in progress
- Technology stack being finalized
- CLAUDE.md documentation established
- Ready to begin implementation

---

## Virtual Agency Architecture

### System Overview

The virtual agency operates as a complete digital marketing organization with interconnected departments, workflows, and deliverables.

### Virtual Team Structure

#### 1. **Account Management Department**
**Roles:**
- Account Manager (Client liaison, project oversight)
- Project Coordinator (Timeline management, task distribution)

**Responsibilities:**
- Client onboarding
- Project brief creation
- Timeline management
- Client communication
- Project status updates

**Outputs:**
- Project briefs
- Timeline documents
- Meeting notes
- Status reports
- Client communication logs

#### 2. **Strategy Department**
**Roles:**
- Marketing Strategist (Campaign planning)
- Market Research Analyst (Data analysis, competitor research)
- Brand Strategist (Brand positioning, messaging)

**Responsibilities:**
- Market research and analysis
- Competitor analysis
- Campaign strategy development
- Target audience definition
- KPI setting

**Outputs:**
- Marketing strategy documents
- Market research reports
- Competitor analysis reports
- Audience personas
- Campaign blueprints

#### 3. **Creative Department**
**Roles:**
- Creative Director (Creative vision, quality control)
- Graphic Designer (Visual design, layouts)
- Copywriter (Content creation, messaging)
- Video Producer (Video content creation)
- UI/UX Designer (Website and app design)

**Responsibilities:**
- Concept development
- Design creation
- Content writing
- Brand asset creation
- Creative quality assurance

**Outputs:**
- Design mockups
- Brand guidelines
- Social media creatives
- Ad copy and content
- Video scripts and storyboards
- Website designs
- Marketing collateral

#### 4. **Digital Marketing Department**
**Roles:**
- SEO Specialist (Search optimization)
- PPC Manager (Paid advertising)
- Social Media Manager (Social presence)
- Email Marketing Specialist (Email campaigns)
- Content Marketing Manager (Content strategy)

**Responsibilities:**
- Campaign execution
- Ad management
- Social media posting
- SEO optimization
- Email campaign management
- Performance monitoring

**Outputs:**
- SEO audit reports
- Keyword research documents
- Ad campaign setups
- Social media calendars
- Email templates
- Content calendars
- Performance reports

#### 5. **Analytics Department**
**Roles:**
- Data Analyst (Performance analysis)
- Reporting Specialist (Report generation)
- Conversion Optimization Specialist (CRO)

**Responsibilities:**
- Data collection and analysis
- Performance tracking
- ROI calculation
- Report generation
- Insight discovery
- Optimization recommendations

**Outputs:**
- Weekly performance reports
- Monthly analytics reports
- Campaign performance analysis
- ROI reports
- Optimization recommendations
- Dashboard updates

### Workflow System

#### Project Lifecycle

```
1. Client Brief Submission
   ↓
2. Account Manager Review
   ↓
3. Strategy Team Assignment
   ↓
4. Research & Strategy Development
   ↓
5. Creative Brief Creation
   ↓
6. Creative Team Assignment
   ↓
7. Concept Development & Design
   ↓
8. Client Review & Feedback
   ↓
9. Revisions (if needed)
   ↓
10. Final Approval
    ↓
11. Campaign Execution
    ↓
12. Performance Monitoring
    ↓
13. Reporting & Analysis
    ↓
14. Optimization Cycle
```

#### Task Management System

**Task States:**
- `QUEUED`: Task created, waiting assignment
- `ASSIGNED`: Assigned to virtual team member
- `IN_PROGRESS`: Currently being worked on
- `REVIEW`: Awaiting review/approval
- `REVISION`: Changes requested
- `COMPLETED`: Task finished
- `DELIVERED`: Sent to client
- `ARCHIVED`: Project closed

**Task Properties:**
- Task ID
- Title
- Description
- Assigned to (virtual team member)
- Priority (Low, Medium, High, Urgent)
- Due date
- Dependencies (blocked by other tasks)
- Files attached
- Comments/Notes
- Time tracking
- Status history

### File Management System

#### File Categories

**1. Project Documents**
- Project briefs
- Meeting notes
- Client requirements
- Timeline documents

**2. Research Files**
- Market research data
- Competitor analysis
- Audience research
- Industry reports

**3. Strategic Documents**
- Campaign strategies
- Content strategies
- Brand positioning docs
- Marketing plans

**4. Creative Assets**
- Design files (PSD, AI, Figma)
- Images and graphics
- Video files
- Audio files
- Brand assets
- Templates

**5. Content Files**
- Blog posts
- Social media copy
- Ad copy
- Email content
- Scripts

**6. Technical Files**
- Website code
- Landing pages
- Email templates
- Tracking implementations

**7. Reports**
- Performance reports
- Analytics reports
- Campaign reports
- Monthly summaries

#### File Properties

Each file in the system has:
- File ID
- File name
- File type/format
- Created by (virtual team member)
- Creation date
- Last modified
- Version number
- File size
- Associated project
- Associated task
- Tags/Categories
- Access permissions
- Comments/Annotations
- Approval status
- Download history

#### Version Control

- Automatic versioning for all files
- Version comparison tools
- Rollback capabilities
- Change history tracking
- Approval workflow per version

### Reporting System

#### Report Types

**1. Project Status Reports**
- Overall project progress
- Completed tasks
- Upcoming milestones
- Blockers and issues
- Timeline status

**2. Performance Reports**
- Campaign metrics
- KPI achievement
- ROI analysis
- Traffic and engagement
- Conversion data

**3. Department Reports**
- Team productivity
- Tasks completed
- Files created
- Time allocation
- Resource utilization

**4. Client Reports**
- Executive summaries
- Detailed analytics
- Recommendations
- Next steps
- Investment breakdown

#### Report Generation Workflow

```
1. Data Collection (Automated)
   ↓
2. Data Processing (Analytics Engine)
   ↓
3. Report Template Selection
   ↓
4. Report Generation (AI-Assisted)
   ↓
5. Quality Check (Virtual Manager)
   ↓
6. Client Delivery
   ↓
7. Feedback Collection
```

#### Report Properties

- Report ID
- Report type
- Generated by
- Generation date
- Period covered
- Associated project/campaign
- Data sources
- Metrics included
- Format (PDF, Excel, Dashboard)
- Distribution list
- Scheduled recurrence
- Custom branding

### Virtual Team Member Profiles

Each virtual team member has:

**Profile Information:**
- Name
- Role/Title
- Department
- Specializations
- Avatar/Photo
- Bio/Description
- Skills and expertise

**Work Information:**
- Current workload
- Active tasks
- Completed projects
- Performance metrics
- Availability status
- Working hours

**Capabilities:**
- Task types they can handle
- File types they can create
- Reports they can generate
- Tools they can use
- Decision-making authority

**Interaction:**
- Chat interface
- Email communication
- Status updates
- Notifications
- Collaboration features

### Client Dashboard

Clients have access to:

**1. Project Overview**
- Active projects
- Project status
- Upcoming deadlines
- Recent updates

**2. Team View**
- Virtual team members assigned
- Current activities
- Availability

**3. Task Tracking**
- All tasks and status
- Progress visualization
- Timeline view
- Gantt charts

**4. File Library**
- All project files
- Organized by type/date
- Preview capabilities
- Download options
- Version history

**5. Reports Center**
- All generated reports
- Scheduled reports
- Custom report builder
- Analytics dashboards

**6. Communication Hub**
- Messages with team
- Notifications
- Project updates
- Meeting schedules

**7. Billing & Invoices**
- Service packages
- Usage tracking
- Invoices
- Payment history

### Automation & Intelligence

#### AI-Powered Features

**1. Smart Task Assignment**
- Automatic assignment based on skills
- Workload balancing
- Priority-based distribution

**2. Intelligent Scheduling**
- Timeline optimization
- Dependency management
- Resource allocation

**3. Content Generation**
- AI-assisted copywriting
- Template-based content
- Personalization

**4. Predictive Analytics**
- Performance forecasting
- Trend analysis
- Optimization suggestions

**5. Automated Reporting**
- Scheduled report generation
- Anomaly detection
- Insight extraction

#### Workflow Automation

- Automatic status updates
- Email notifications
- Task progression triggers
- File processing pipelines
- Report distribution
- Approval workflows

### Integration Capabilities

**Marketing Tools:**
- Google Analytics
- Google Ads
- Facebook Ads Manager
- LinkedIn Campaign Manager
- MailChimp/Email platforms
- Social media platforms
- SEO tools

**Project Management:**
- Calendar sync
- Task import/export
- Time tracking tools

**Communication:**
- Email integration
- Slack notifications
- SMS alerts

**File Storage:**
- Cloud storage sync
- CDN integration
- Backup systems

---

## Repository Status

### What Exists
- ✅ Git repository initialized
- ✅ Remote origin configured (alfainternational/markitingco)
- ✅ README.md with project name
- ✅ CLAUDE.md (comprehensive architecture documentation)
- ✅ Project vision and concept defined
- ✅ Virtual agency architecture documented
- ✅ Technology stack proposed
- ✅ Complete system design specifications

### Planning Complete
- ✅ Virtual team structure (5 departments, multiple roles)
- ✅ Workflow system design
- ✅ File management system architecture
- ✅ Reporting system specifications
- ✅ Task management system design
- ✅ Client dashboard requirements
- ✅ AI integration strategy
- ✅ Project directory structure

### Ready for Implementation

**Phase 1: Foundation Setup**
- ⏳ Initialize monorepo structure
- ⏳ Set up backend (NestJS) boilerplate
- ⏳ Set up frontend (React/Next.js) boilerplate
- ⏳ Configure TypeScript across projects
- ⏳ Set up database (PostgreSQL) and migrations
- ⏳ Create .gitignore file
- ⏳ Configure ESLint and Prettier
- ⏳ Set up testing frameworks

**Phase 2: Core Systems**
- ⏳ Authentication & authorization system
- ⏳ User and client management
- ⏳ Project management module
- ⏳ Task management system
- ⏳ File storage and management
- ⏳ Virtual team member system
- ⏳ Workflow engine

**Phase 3: Advanced Features**
- ⏳ AI integration for virtual team members
- ⏳ Report generation system
- ⏳ Analytics dashboard
- ⏳ Real-time notifications
- ⏳ Email system integration
- ⏳ External API integrations

**Phase 4: Polish & Deploy**
- ⏳ CI/CD pipeline setup
- ⏳ Production deployment configuration
- ⏳ Performance optimization
- ⏳ Security audit
- ⏳ User documentation
- ⏳ API documentation
- ⏳ Contributing guidelines
- ⏳ License file

---

## Development Workflow

### Branch Strategy

**Main Branch:** [TO BE CONFIRMED]
**Current Development Branch:** `claude/claude-md-mkpw3nsa3mtrer1n-aPl5P`

#### Branch Naming Conventions

AI-generated branches must follow this pattern:
```
claude/claude-<task-description>-<session-id>
```

**Important:** Branch names MUST:
- Start with `claude/`
- End with the matching session ID
- Use kebab-case for task descriptions
- Example: `claude/add-authentication-abc123xyz`

#### Branch Workflow

1. **Create Feature Branch**
   ```bash
   git checkout -b claude/feature-name-session-id
   ```

2. **Develop on Feature Branch**
   - Make all changes on the designated branch
   - Commit frequently with clear messages
   - Keep commits focused and atomic

3. **Push to Remote**
   ```bash
   git push -u origin claude/feature-name-session-id
   ```

4. **Create Pull Request**
   - Use `gh pr create` when work is ready for review
   - Include comprehensive description
   - Link related issues if applicable

### Git Operations Best Practices

#### Pushing Changes
```bash
# Always use -u flag for first push
git push -u origin <branch-name>

# Network error handling: Retry up to 4 times with exponential backoff
# (2s, 4s, 8s, 16s) if push fails due to network issues
```

#### Fetching/Pulling
```bash
# Prefer fetching specific branches
git fetch origin <branch-name>

# For pulls
git pull origin <branch-name>

# Apply same retry logic (up to 4 retries) for network failures
```

#### Git Configuration
```
User: Claude
Email: noreply@anthropic.com
Signing: Enabled (SSH-based)
```

---

## Codebase Structure

### Current Structure
```
markitingco/
├── .git/                 # Git repository metadata
├── README.md             # Project documentation
└── CLAUDE.md            # This file - AI assistant guide
```

### Recommended Future Structure

The following structure is designed for a full-stack virtual agency platform:

```
markitingco/
├── .github/                      # GitHub configurations
│   ├── workflows/                # CI/CD pipelines
│   │   ├── frontend.yml          # Frontend deployment
│   │   ├── backend.yml           # Backend deployment
│   │   └── tests.yml             # Automated testing
│   └── ISSUE_TEMPLATE/           # Issue templates
│
├── docs/                         # Documentation
│   ├── api/                      # API documentation
│   ├── architecture/             # System architecture docs
│   ├── user-guides/              # User documentation
│   └── development/              # Developer guides
│
├── backend/                      # Backend application
│   ├── src/
│   │   ├── modules/              # Feature modules
│   │   │   ├── auth/             # Authentication & authorization
│   │   │   ├── projects/         # Project management
│   │   │   ├── tasks/            # Task management system
│   │   │   ├── files/            # File management
│   │   │   ├── reports/          # Report generation
│   │   │   ├── team/             # Virtual team members
│   │   │   ├── clients/          # Client management
│   │   │   ├── workflows/        # Workflow engine
│   │   │   ├── analytics/        # Analytics & insights
│   │   │   ├── notifications/    # Notification system
│   │   │   └── ai/               # AI integrations
│   │   ├── common/               # Shared resources
│   │   │   ├── decorators/       # Custom decorators
│   │   │   ├── guards/           # Auth guards
│   │   │   ├── interceptors/     # Request/response interceptors
│   │   │   ├── filters/          # Exception filters
│   │   │   └── pipes/            # Validation pipes
│   │   ├── database/             # Database layer
│   │   │   ├── entities/         # Database entities
│   │   │   ├── migrations/       # DB migrations
│   │   │   ├── seeders/          # Data seeders
│   │   │   └── repositories/     # Custom repositories
│   │   ├── config/               # Configuration
│   │   │   ├── database.config.ts
│   │   │   ├── app.config.ts
│   │   │   └── ai.config.ts
│   │   ├── utils/                # Utility functions
│   │   ├── types/                # TypeScript types
│   │   └── main.ts               # Application entry point
│   ├── test/                     # Backend tests
│   │   ├── unit/
│   │   ├── integration/
│   │   └── e2e/
│   ├── package.json
│   ├── tsconfig.json
│   └── nest-cli.json             # NestJS configuration
│
├── frontend/                     # Frontend application
│   ├── public/                   # Static assets
│   │   ├── images/
│   │   ├── fonts/
│   │   └── icons/
│   ├── src/
│   │   ├── app/                  # Main app
│   │   ├── pages/                # Page components
│   │   │   ├── Dashboard/        # Client dashboard
│   │   │   ├── Projects/         # Project management
│   │   │   ├── Team/             # Virtual team view
│   │   │   ├── Tasks/            # Task management
│   │   │   ├── Files/            # File library
│   │   │   ├── Reports/          # Reports center
│   │   │   ├── Analytics/        # Analytics dashboard
│   │   │   ├── Settings/         # User settings
│   │   │   └── Auth/             # Authentication pages
│   │   ├── components/           # Reusable components
│   │   │   ├── common/           # Common UI components
│   │   │   ├── layout/           # Layout components
│   │   │   ├── team/             # Team member components
│   │   │   ├── tasks/            # Task components
│   │   │   ├── files/            # File components
│   │   │   ├── charts/           # Chart components
│   │   │   └── forms/            # Form components
│   │   ├── features/             # Feature-specific logic
│   │   │   ├── projects/
│   │   │   ├── workflows/
│   │   │   ├── team/
│   │   │   └── reporting/
│   │   ├── hooks/                # Custom React hooks
│   │   ├── services/             # API services
│   │   │   ├── api.service.ts    # Base API service
│   │   │   ├── auth.service.ts
│   │   │   ├── project.service.ts
│   │   │   ├── task.service.ts
│   │   │   ├── file.service.ts
│   │   │   └── report.service.ts
│   │   ├── store/                # State management
│   │   │   ├── slices/           # Redux slices
│   │   │   ├── actions/
│   │   │   └── store.ts
│   │   ├── utils/                # Utility functions
│   │   ├── types/                # TypeScript types
│   │   ├── styles/               # Global styles
│   │   ├── constants/            # Constants
│   │   └── config/               # Configuration
│   ├── test/                     # Frontend tests
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   └── vite.config.ts            # or next.config.js
│
├── shared/                       # Shared code (types, constants)
│   ├── types/                    # Shared TypeScript types
│   ├── constants/                # Shared constants
│   └── utils/                    # Shared utilities
│
├── ai-services/                  # AI/ML services
│   ├── agents/                   # Virtual team member AI agents
│   │   ├── account-manager/
│   │   ├── strategist/
│   │   ├── designer/
│   │   ├── copywriter/
│   │   └── analyst/
│   ├── workflows/                # AI workflow definitions
│   ├── prompts/                  # AI prompt templates
│   └── integrations/             # External AI API integrations
│
├── file-storage/                 # File storage configuration
│   ├── templates/                # File templates
│   ├── uploads/                  # Temporary uploads (gitignored)
│   └── storage.config.ts
│
├── report-engine/                # Report generation system
│   ├── templates/                # Report templates
│   │   ├── performance/
│   │   ├── analytics/
│   │   └── project-status/
│   ├── generators/               # Report generator logic
│   └── schedulers/               # Scheduled report jobs
│
├── database/                     # Database files
│   ├── schemas/                  # Database schemas
│   ├── migrations/               # Migration files
│   └── seeds/                    # Seed data
│
├── scripts/                      # Utility scripts
│   ├── setup.sh                  # Initial setup
│   ├── deploy.sh                 # Deployment script
│   ├── seed-data.ts              # Seed virtual team data
│   └── generate-reports.ts       # Report generation
│
├── config/                       # Configuration files
│   ├── development.env
│   ├── production.env
│   └── test.env
│
├── docker/                       # Docker configurations
│   ├── Dockerfile.backend
│   ├── Dockerfile.frontend
│   └── docker-compose.yml
│
├── tests/                        # Integration & E2E tests
│   ├── integration/
│   └── e2e/
│
├── .gitignore
├── .env.example
├── package.json                  # Root package.json (monorepo)
├── tsconfig.json                 # Root TypeScript config
├── README.md
├── CLAUDE.md                     # This file
├── CONTRIBUTING.md
├── CHANGELOG.md
├── LICENSE
└── lerna.json                    # Or nx.json for monorepo management
```

**Key Directories Explained:**

- **backend/**: NestJS-based API server handling all business logic
- **frontend/**: React/Next.js client application
- **shared/**: Types and utilities shared between frontend and backend
- **ai-services/**: AI agent definitions and workflows for virtual team members
- **report-engine/**: Dedicated service for generating reports
- **file-storage/**: File management and storage configuration
- **database/**: Database schemas, migrations, and seeds

---

## Git Conventions

### Commit Message Format

Follow conventional commits specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

#### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `perf`: Performance improvements
- `ci`: CI/CD changes
- `build`: Build system changes

#### Examples
```bash
feat(auth): add user authentication with JWT

Implement JWT-based authentication system including:
- Login endpoint
- Token validation middleware
- Refresh token mechanism

Closes #123
```

```bash
fix(api): resolve timeout issue in data fetching

Increase timeout from 5s to 30s for large datasets
Add retry logic for failed requests

Fixes #456
```

### Commit Best Practices

1. **Atomic Commits**: Each commit should represent one logical change
2. **Clear Messages**: Explain WHY, not just WHAT
3. **Present Tense**: Use "add feature" not "added feature"
4. **Reference Issues**: Link to relevant issues/PRs
5. **Sign Commits**: Ensure commits are properly signed

### What NOT to Commit

- Secrets and API keys (.env files with real credentials)
- Large binary files (use Git LFS if needed)
- Dependencies (node_modules, vendor, etc.)
- Build artifacts (dist, build, out directories)
- IDE-specific files (.vscode, .idea unless team-agreed)
- OS-specific files (.DS_Store, Thumbs.db)
- Temporary files (*.tmp, *.log)

---

## Code Standards

### General Principles

1. **KISS (Keep It Simple, Stupid)**
   - Avoid over-engineering
   - Only implement what's requested
   - Don't add features speculatively

2. **YAGNI (You Aren't Gonna Need It)**
   - Don't build for hypothetical future requirements
   - Add complexity only when needed
   - Three similar lines > premature abstraction

3. **DRY (Don't Repeat Yourself)**
   - Extract common logic only after third usage
   - Avoid premature abstraction
   - Prioritize clarity over brevity

### Code Quality Guidelines

#### Security
- ⚠️ **CRITICAL:** Never introduce security vulnerabilities
- Validate all external input (user input, API responses)
- Sanitize data to prevent XSS, SQL injection, command injection
- Follow OWASP Top 10 best practices
- Review OWASP guidelines for the specific stack
- If insecure code is detected, fix immediately

#### Error Handling
- Only add error handling at system boundaries
- Don't add try/catch for scenarios that can't happen
- Trust internal code and framework guarantees
- Log errors appropriately (include context)
- Fail fast and loudly in development

#### Code Complexity
- Avoid unnecessary abstractions
- Don't create utilities for one-time operations
- Keep functions focused and single-purpose
- Use meaningful variable and function names
- Prefer explicit over implicit code

#### Comments and Documentation
- Only add comments where logic isn't self-evident
- Don't add docstrings to code you didn't change
- Use comments to explain WHY, not WHAT
- Keep comments up-to-date with code changes
- Remove commented-out code (git history preserves it)

### Backwards Compatibility

- Avoid backwards-compatibility hacks unless explicitly needed
- Don't rename unused variables with `_prefix`
- Don't add `// removed` comments for deleted code
- If code is unused, delete it completely
- Git history is the source of truth for old code

---

## Testing Guidelines

### Testing Philosophy

**Status:** [TO BE CONFIGURED - No testing framework yet]

When testing is set up, follow these guidelines:

1. **Test What Matters**
   - Focus on business logic and critical paths
   - Don't test framework functionality
   - Don't test trivial getters/setters

2. **Test Structure**
   - Arrange, Act, Assert (AAA) pattern
   - One assertion per test (when possible)
   - Clear test names describing expected behavior

3. **Test Coverage**
   - Aim for meaningful coverage, not 100%
   - Cover edge cases and error conditions
   - Test public APIs, not implementation details

### Test Types

- **Unit Tests**: Test individual functions/methods in isolation
- **Integration Tests**: Test interaction between components
- **E2E Tests**: Test complete user workflows
- **Performance Tests**: Test performance-critical code

### Running Tests

[TO BE DOCUMENTED - Add test commands when testing is configured]

---

## Documentation Standards

### Code Documentation

1. **README.md**
   - Project overview and purpose
   - Installation instructions
   - Usage examples
   - Configuration options
   - Contributing guidelines link

2. **CLAUDE.md** (This File)
   - AI assistant guidance
   - Codebase structure
   - Development conventions
   - Keep updated with project changes

3. **Inline Comments**
   - Explain complex algorithms
   - Document non-obvious decisions
   - Add context for future maintainers
   - Keep concise and relevant

4. **API Documentation**
   - Document all public APIs
   - Include parameters, return values, examples
   - Document error conditions
   - Keep synchronized with code

### Documentation Updates

- Update documentation when changing functionality
- Review documentation during code review
- Remove outdated documentation promptly
- Version documentation with code

---

## AI Assistant Guidelines

### Core Responsibilities

As an AI assistant working on this codebase:

1. **Read Before Modifying**
   - NEVER propose changes to unread code
   - Always read files before editing
   - Understand context before suggesting modifications

2. **Use TodoWrite for Planning**
   - Use TodoWrite tool for multi-step tasks
   - Break complex work into smaller todos
   - Mark todos as completed immediately after finishing
   - Keep only ONE todo in_progress at a time

3. **Follow Task Workflow**
   - Research/Read → Plan → Implement → Test → Commit
   - Don't skip steps
   - Validate each step before proceeding

### Tool Usage Best Practices

#### File Operations
- **Read files**: Use `Read` tool (not `cat`)
- **Edit files**: Use `Edit` tool (not `sed`/`awk`)
- **Write files**: Use `Write` tool (not `echo >` or heredoc)
- **Search files**: Use `Glob` tool (not `find`/`ls`)
- **Search content**: Use `Grep` tool (not `grep`/`rg`)

#### Exploration
- Use `Task` tool with `subagent_type=Explore` for:
  - Understanding codebase structure
  - Finding how features work
  - Answering "where is X handled?" questions
- Use `Task` tool with `subagent_type=Plan` for:
  - Planning complex implementations
  - Designing architecture
  - Breaking down large features

#### Parallel Operations
- Run independent tools in parallel when possible
- Use single message with multiple tool calls
- Examples:
  - Reading multiple files
  - Running `git status` and `git diff` together
  - Searching multiple patterns

### What to Avoid

1. **Don't Over-Engineer**
   - Only implement what's requested
   - Avoid speculative features
   - Keep solutions simple

2. **Don't Create Unnecessary Files**
   - Prefer editing existing files
   - Only create files when absolutely necessary
   - Don't proactively create documentation unless requested

3. **Don't Add Unrelated Changes**
   - Bug fix ≠ refactoring opportunity
   - Feature addition ≠ code cleanup time
   - Focus on requested changes only

4. **Don't Use Emojis**
   - Unless explicitly requested by user
   - Keep communication professional
   - Use markdown for emphasis

### Security Awareness

- Review code for common vulnerabilities:
  - SQL Injection
  - XSS (Cross-Site Scripting)
  - Command Injection
  - Path Traversal
  - Insecure Deserialization
  - Authentication/Authorization flaws
  - Sensitive data exposure

- If vulnerability found:
  1. Fix immediately
  2. Explain the issue
  3. Suggest additional security measures

### Communication Style

- Be concise and direct
- Focus on technical accuracy
- Avoid excessive praise or validation
- Disagree when necessary (professionally)
- Prioritize facts over assumptions
- No timelines in planning (focus on WHAT, not WHEN)

---

## Common Tasks

### Starting a New Feature

```bash
# 1. Create feature branch
git checkout -b claude/feature-name-session-id

# 2. Plan the work (use TodoWrite)
# - Break down into steps
# - Identify files to modify
# - Consider dependencies

# 3. Implement step by step
# - Read relevant files first
# - Make focused changes
# - Test as you go

# 4. Commit work
git add <files>
git commit -m "feat(scope): description"

# 5. Push to remote
git push -u origin claude/feature-name-session-id

# 6. Create pull request (when ready)
gh pr create --title "Feature: Description" --body "Detailed description"
```

### Fixing a Bug

```bash
# 1. Create bugfix branch
git checkout -b claude/fix-bug-description-session-id

# 2. Investigate the issue
# - Read relevant code
# - Understand root cause
# - Identify fix location

# 3. Implement fix
# - Make minimal changes
# - Add tests if applicable
# - Verify fix works

# 4. Commit
git add <files>
git commit -m "fix(scope): description of bug fix"

# 5. Push and PR
git push -u origin claude/fix-bug-description-session-id
gh pr create --title "Fix: Bug description" --body "Details"
```

### Updating Documentation

```bash
# 1. Identify what needs updating
# - Code changes requiring doc updates
# - Outdated information
# - Missing documentation

# 2. Update relevant files
# - README.md for user-facing changes
# - CLAUDE.md for AI assistant guidance
# - Code comments for implementation details

# 3. Commit documentation
git add <doc-files>
git commit -m "docs: update documentation for X"
```

### Project Initialization (When Ready)

When the project is ready to be initialized with a technology stack:

1. **Choose Technology Stack**
   - Document decision in README.md
   - List all major technologies and frameworks
   - Include version information

2. **Initialize Package Manager**
   ```bash
   # For Node.js
   npm init -y
   # or
   yarn init -y
   ```

3. **Create Directory Structure**
   - Follow recommended structure (see above)
   - Create necessary directories
   - Add .gitkeep files for empty directories

4. **Add Configuration Files**
   - .gitignore
   - Linting configuration (ESLint, etc.)
   - Formatting configuration (Prettier, etc.)
   - TypeScript configuration (if applicable)
   - Build configuration

5. **Set Up Testing**
   - Choose testing framework
   - Configure test runner
   - Create test directory structure
   - Add example tests

6. **Configure CI/CD**
   - Create .github/workflows directory
   - Add basic CI workflow
   - Include linting, testing, building

7. **Update Documentation**
   - Expand README.md with setup instructions
   - Update CLAUDE.md with new structure
   - Add CONTRIBUTING.md
   - Add LICENSE file

---

## Version History

### 2026-01-23 - Major Update: Virtual Agency Architecture
- **Project Vision Defined**: Comprehensive virtual digital marketing agency platform
- **Virtual Agency Architecture**: Complete documentation of virtual team structure
  - 5 departments with specific roles and responsibilities
  - Detailed workflow system and task management
  - Comprehensive file management system
  - Advanced reporting system
  - Virtual team member profiles and capabilities
  - Client dashboard specifications
  - AI-powered automation features
  - Integration capabilities
- **Technology Stack**: Proposed full-stack architecture
  - Frontend: React/Next.js with TypeScript
  - Backend: Node.js/NestJS with TypeScript
  - Database: PostgreSQL
  - AI Integration: OpenAI API
  - File Storage: Cloud-based solutions
- **Project Structure**: Detailed monorepo structure for virtual agency platform
- **Target Audience**: Defined service levels (small to large businesses)
- **Updated Status**: Changed from "Initial Setup" to "Planning & Architecture"

### 2026-01-22 - Initial Creation
- Created CLAUDE.md for new repository
- Documented initial state and conventions
- Established guidelines for AI assistants
- Defined future project structure

---

## Notes for Future Updates

When updating this file:

1. **Update "Last Updated" date** at the top
2. **Add entry to Version History** section
3. **Update relevant sections** with new information
4. **Remove "TO BE DEFINED"** markers as things are decided
5. **Keep structure consistent** for easy navigation
6. **Commit with clear message**: `docs: update CLAUDE.md with X`

---

## Questions or Clarifications Needed

If you're an AI assistant and encounter unclear situations:

1. **Document the ambiguity** in comments or commit messages
2. **Ask the user** for clarification when possible
3. **Follow best practices** as default when unclear
4. **Update this file** once clarification is received

---

## Additional Resources

- [Repository URL](https://github.com/alfainternational/markitingco)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Git Best Practices](https://git-scm.com/book/en/v2)

---

**End of CLAUDE.md**
