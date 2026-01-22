# CLAUDE.md - AI Assistant Guide for markitingco

**Last Updated:** 2026-01-22
**Project Status:** Initial Setup Phase
**Repository:** alfainternational/markitingco

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Repository Status](#repository-status)
3. [Development Workflow](#development-workflow)
4. [Codebase Structure](#codebase-structure)
5. [Git Conventions](#git-conventions)
6. [Code Standards](#code-standards)
7. [Testing Guidelines](#testing-guidelines)
8. [Documentation Standards](#documentation-standards)
9. [AI Assistant Guidelines](#ai-assistant-guidelines)
10. [Common Tasks](#common-tasks)

---

## Project Overview

### About markitingco

**Project Name:** markitingco
**Purpose:** [TO BE DEFINED - Project purpose not yet documented]
**Technology Stack:** [TO BE DEFINED - No stack configured yet]

### Current State

This repository is in its initial setup phase. As of the last update:
- Only initial commit exists (4ab6eef)
- Minimal README.md file present
- No source code or configuration files yet
- No dependencies or build system configured

---

## Repository Status

### What Exists
- ✅ Git repository initialized
- ✅ Remote origin configured (alfainternational/markitingco)
- ✅ README.md with project name
- ✅ CLAUDE.md (this file)

### What Needs to Be Created
- ⏳ Project technology stack decision
- ⏳ Package manager configuration (package.json, etc.)
- ⏳ Source code directory structure
- ⏳ Build and deployment configuration
- ⏳ Testing framework setup
- ⏳ Linting and formatting tools
- ⏳ CI/CD pipeline
- ⏳ Contributing guidelines
- ⏳ License file
- ⏳ .gitignore file

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

When the project is initialized, adopt this structure:

```
markitingco/
├── .github/              # GitHub specific files
│   ├── workflows/        # CI/CD workflows
│   └── ISSUE_TEMPLATE/   # Issue templates
├── docs/                 # Documentation
├── src/                  # Source code
│   ├── components/       # Reusable components
│   ├── services/         # Business logic services
│   ├── utils/            # Utility functions
│   ├── types/            # Type definitions
│   └── config/           # Configuration files
├── tests/                # Test files
│   ├── unit/             # Unit tests
│   ├── integration/      # Integration tests
│   └── e2e/              # End-to-end tests
├── public/               # Static assets (if web project)
├── scripts/              # Build and utility scripts
├── .gitignore            # Git ignore patterns
├── package.json          # Dependencies (if Node.js)
├── tsconfig.json         # TypeScript config (if TypeScript)
├── README.md             # Project overview
├── CLAUDE.md             # This file
├── CONTRIBUTING.md       # Contribution guidelines
├── CHANGELOG.md          # Version history
└── LICENSE               # Project license
```

**Note:** Adjust structure based on chosen technology stack.

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
