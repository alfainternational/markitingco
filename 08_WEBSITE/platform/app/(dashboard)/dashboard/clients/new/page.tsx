"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { ArrowLeft, Loader2, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"

const clientSchema = z.object({
  // Personal Information
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  jobTitle: z.string().optional(),

  // Company Information
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  companyWebsite: z.string().url("Invalid URL").optional().or(z.literal("")),
  industry: z.string().min(1, "Please select an industry"),
  companySize: z.string().min(1, "Please select company size"),

  // Address
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  country: z.string().optional(),

  // Business Details
  status: z.enum(["lead", "active", "inactive"]),
  source: z.string().optional(),
  referredBy: z.string().optional(),

  // Notes
  notes: z.string().optional(),
})

type ClientFormData = z.infer<typeof clientSchema>

export default function NewClientPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      status: "lead",
      country: "United States",
    },
  })

  const selectedIndustry = watch("industry")
  const selectedCompanySize = watch("companySize")
  const selectedStatus = watch("status")

  const onSubmit = async (data: ClientFormData) => {
    setIsLoading(true)
    setError(null)

    try {
      // TODO: Implement actual API call
      const response = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to create client")
      }

      const result = await response.json()

      // Redirect to client detail page
      router.push(`/dashboard/clients/${result.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button asChild variant="ghost" size="icon">
          <Link href="/dashboard/clients">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Add New Client
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Create a new client profile
          </p>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Contact details for the primary client contact
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Input
                {...register("firstName")}
                label="First Name"
                placeholder="John"
                error={errors.firstName?.message}
                required
              />

              <Input
                {...register("lastName")}
                label="Last Name"
                placeholder="Doe"
                error={errors.lastName?.message}
                required
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Input
                {...register("email")}
                type="email"
                label="Email Address"
                placeholder="john@example.com"
                error={errors.email?.message}
                required
              />

              <Input
                {...register("phone")}
                type="tel"
                label="Phone Number"
                placeholder="+1 (555) 123-4567"
                error={errors.phone?.message}
                required
              />
            </div>

            <Input
              {...register("jobTitle")}
              label="Job Title"
              placeholder="Marketing Director"
              error={errors.jobTitle?.message}
            />
          </CardContent>
        </Card>

        {/* Company Information */}
        <Card>
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
            <CardDescription>
              Details about the client's organization
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              {...register("companyName")}
              label="Company Name"
              placeholder="Acme Inc."
              error={errors.companyName?.message}
              required
            />

            <Input
              {...register("companyWebsite")}
              type="url"
              label="Company Website"
              placeholder="https://example.com"
              error={errors.companyWebsite?.message}
            />

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Industry <span className="text-red-500">*</span>
                </label>
                <Select
                  value={selectedIndustry}
                  onValueChange={(value) => setValue("industry", value)}
                >
                  <SelectTrigger error={errors.industry?.message}>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="real-estate">Real Estate</SelectItem>
                    <SelectItem value="hospitality">Hospitality</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.industry && (
                  <p className="mt-1 text-sm text-red-600">{errors.industry.message}</p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Company Size <span className="text-red-500">*</span>
                </label>
                <Select
                  value={selectedCompanySize}
                  onValueChange={(value) => setValue("companySize", value)}
                >
                  <SelectTrigger error={errors.companySize?.message}>
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">1-10 employees</SelectItem>
                    <SelectItem value="11-50">11-50 employees</SelectItem>
                    <SelectItem value="51-200">51-200 employees</SelectItem>
                    <SelectItem value="201-500">201-500 employees</SelectItem>
                    <SelectItem value="501-1000">501-1000 employees</SelectItem>
                    <SelectItem value="1000+">1000+ employees</SelectItem>
                  </SelectContent>
                </Select>
                {errors.companySize && (
                  <p className="mt-1 text-sm text-red-600">{errors.companySize.message}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Address Information */}
        <Card>
          <CardHeader>
            <CardTitle>Address Information</CardTitle>
            <CardDescription>
              Physical address of the client's business
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              {...register("address")}
              label="Street Address"
              placeholder="123 Business St"
              error={errors.address?.message}
            />

            <div className="grid gap-4 md:grid-cols-2">
              <Input
                {...register("city")}
                label="City"
                placeholder="San Francisco"
                error={errors.city?.message}
              />

              <Input
                {...register("state")}
                label="State/Province"
                placeholder="CA"
                error={errors.state?.message}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Input
                {...register("zipCode")}
                label="ZIP/Postal Code"
                placeholder="94102"
                error={errors.zipCode?.message}
              />

              <Input
                {...register("country")}
                label="Country"
                placeholder="United States"
                error={errors.country?.message}
              />
            </div>
          </CardContent>
        </Card>

        {/* Business Details */}
        <Card>
          <CardHeader>
            <CardTitle>Business Details</CardTitle>
            <CardDescription>
              Additional information about the client relationship
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Status <span className="text-red-500">*</span>
              </label>
              <Select
                value={selectedStatus}
                onValueChange={(value: any) => setValue("status", value)}
              >
                <SelectTrigger error={errors.status?.message}>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lead">Lead</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              {errors.status && (
                <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
              )}
            </div>

            <Input
              {...register("source")}
              label="Source"
              placeholder="How did they find us? (e.g., Referral, Website, Social Media)"
              error={errors.source?.message}
            />

            <Input
              {...register("referredBy")}
              label="Referred By"
              placeholder="Name of person who referred this client"
              error={errors.referredBy?.message}
            />
          </CardContent>
        </Card>

        {/* Notes */}
        <Card>
          <CardHeader>
            <CardTitle>Notes</CardTitle>
            <CardDescription>
              Additional notes or comments about this client
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              {...register("notes")}
              label="Notes"
              placeholder="Enter any additional information about this client..."
              rows={5}
              error={errors.notes?.message}
            />
          </CardContent>
        </Card>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4">
          <Button asChild variant="outline" type="button">
            <Link href="/dashboard/clients">Cancel</Link>
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Create Client
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
