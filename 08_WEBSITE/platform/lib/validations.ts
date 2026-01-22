import { z } from 'zod'

// ============================================
// AUTH VALIDATIONS
// ============================================

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  phone: z.string().optional(),
})

export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
})

export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

// ============================================
// USER VALIDATIONS
// ============================================

export const updateProfileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  email: z.string().email('Invalid email address').optional(),
  phone: z.string().optional(),
  image: z.string().url('Invalid image URL').optional(),
})

export const createUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum([
    'SUPER_ADMIN',
    'ADMIN',
    'AGENCY_MANAGER',
    'ACCOUNT_MANAGER',
    'CONTENT_CREATOR',
    'ANALYST',
    'CLIENT',
  ]),
  phone: z.string().optional(),
})

// ============================================
// ORGANIZATION VALIDATIONS
// ============================================

export const createOrganizationSchema = z.object({
  name: z.string().min(2, 'Organization name must be at least 2 characters'),
  slug: z
    .string()
    .min(2, 'Slug must be at least 2 characters')
    .regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  industry: z.string().optional(),
  website: z.string().url('Invalid website URL').optional(),
  description: z.string().optional(),
  billingEmail: z.string().email('Invalid email address').optional(),
  phone: z.string().optional(),
  taxId: z.string().optional(),
  planType: z.enum(['STARTER', 'GROWTH', 'ENTERPRISE', 'CUSTOM']).default('STARTER'),
})

export const updateOrganizationSchema = createOrganizationSchema.partial()

// ============================================
// PROJECT VALIDATIONS
// ============================================

export const createProjectSchema = z.object({
  organizationId: z.string().cuid(),
  name: z.string().min(2, 'Project name must be at least 2 characters'),
  slug: z
    .string()
    .min(2, 'Slug must be at least 2 characters')
    .regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  description: z.string().optional(),
  type: z.enum([
    'SEO',
    'PPC',
    'SOCIAL_MEDIA',
    'CONTENT_MARKETING',
    'EMAIL_MARKETING',
    'BRANDING',
    'WEB_DEVELOPMENT',
    'COMPREHENSIVE',
  ]),
  budget: z.number().positive('Budget must be positive').optional(),
  currency: z.string().length(3, 'Currency must be 3 characters').default('USD'),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
})

export const updateProjectSchema = createProjectSchema.partial()

// ============================================
// CAMPAIGN VALIDATIONS
// ============================================

export const createCampaignSchema = z.object({
  projectId: z.string().cuid(),
  name: z.string().min(2, 'Campaign name must be at least 2 characters'),
  platform: z.enum([
    'GOOGLE_ADS',
    'GOOGLE_DISPLAY',
    'FACEBOOK',
    'INSTAGRAM',
    'LINKEDIN',
    'TWITTER',
    'TIKTOK',
    'SNAPCHAT',
    'YOUTUBE',
    'EMAIL',
    'OTHER',
  ]),
  objective: z.string().optional(),
  description: z.string().optional(),
  budgetDaily: z.number().positive('Daily budget must be positive').optional(),
  budgetTotal: z.number().positive('Total budget must be positive').optional(),
  currency: z.string().length(3, 'Currency must be 3 characters').default('USD'),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
})

export const updateCampaignSchema = createCampaignSchema.partial()

// ============================================
// TASK VALIDATIONS
// ============================================

export const createTaskSchema = z.object({
  projectId: z.string().cuid(),
  title: z.string().min(2, 'Task title must be at least 2 characters'),
  description: z.string().optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).default('MEDIUM'),
  assignedToId: z.string().cuid().optional(),
  dueDate: z.string().datetime().optional(),
  tags: z.array(z.string()).optional(),
})

export const updateTaskSchema = z.object({
  title: z.string().min(2, 'Task title must be at least 2 characters').optional(),
  description: z.string().optional(),
  status: z.enum(['TODO', 'IN_PROGRESS', 'REVIEW', 'BLOCKED', 'DONE', 'CANCELLED']).optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).optional(),
  assignedToId: z.string().cuid().nullable().optional(),
  dueDate: z.string().datetime().nullable().optional(),
  tags: z.array(z.string()).optional(),
})

// ============================================
// CONTENT VALIDATIONS
// ============================================

export const createContentSchema = z.object({
  projectId: z.string().cuid(),
  campaignId: z.string().cuid().optional(),
  type: z.enum([
    'BLOG_POST',
    'SOCIAL_POST',
    'EMAIL',
    'AD_COPY',
    'VIDEO_SCRIPT',
    'INFOGRAPHIC',
    'EBOOK',
    'WHITEPAPER',
    'CASE_STUDY',
    'OTHER',
  ]),
  title: z.string().min(2, 'Content title must be at least 2 characters'),
  content: z.string().optional(),
  platform: z.string().optional(),
  scheduledDate: z.string().datetime().optional(),
})

export const updateContentSchema = createContentSchema.partial()

// ============================================
// INVOICE VALIDATIONS
// ============================================

export const createInvoiceSchema = z.object({
  organizationId: z.string().cuid(),
  amount: z.number().positive('Amount must be positive'),
  currency: z.string().length(3, 'Currency must be 3 characters').default('USD'),
  dueDate: z.string().datetime(),
  lineItems: z.array(
    z.object({
      description: z.string(),
      quantity: z.number().positive(),
      unitPrice: z.number().positive(),
      total: z.number().positive(),
    })
  ),
  notes: z.string().optional(),
})

export const updateInvoiceSchema = createInvoiceSchema.partial()

// ============================================
// PROPOSAL VALIDATIONS
// ============================================

export const createProposalSchema = z.object({
  organizationId: z.string().cuid(),
  title: z.string().min(2, 'Proposal title must be at least 2 characters'),
  description: z.string().optional(),
  services: z.array(
    z.object({
      serviceId: z.string(),
      name: z.string(),
      description: z.string().optional(),
      quantity: z.number().positive(),
      unitPrice: z.number().positive(),
      total: z.number().positive(),
    })
  ),
  totalAmount: z.number().positive('Total amount must be positive'),
  currency: z.string().length(3, 'Currency must be 3 characters').default('USD'),
  validUntil: z.string().datetime(),
})

export const updateProposalSchema = createProposalSchema.partial()

// ============================================
// MESSAGE VALIDATIONS
// ============================================

export const sendMessageSchema = z.object({
  conversationId: z.string().cuid(),
  content: z.string().min(1, 'Message content cannot be empty'),
  attachments: z.array(z.object({
    url: z.string().url(),
    name: z.string(),
    size: z.number(),
    type: z.string(),
  })).optional(),
})

// ============================================
// CONTACT FORM VALIDATION
// ============================================

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

// ============================================
// QUOTE REQUEST VALIDATION
// ============================================

export const quoteRequestSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  company: z.string().min(2, 'Company name must be at least 2 characters'),
  website: z.string().url('Invalid website URL').optional(),
  services: z.array(z.string()).min(1, 'Please select at least one service'),
  budget: z.string(),
  timeline: z.string(),
  description: z.string().min(20, 'Description must be at least 20 characters'),
})
