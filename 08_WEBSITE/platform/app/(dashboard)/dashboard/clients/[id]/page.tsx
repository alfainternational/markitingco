"use client"

import * as React from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  ArrowLeft,
  Mail,
  Phone,
  Building,
  MapPin,
  Calendar,
  Edit,
  MoreHorizontal,
  FolderKanban,
  DollarSign,
  FileText,
  Activity,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"

// Mock data - in real app, this would come from API
const client = {
  id: "1",
  name: "Sarah Johnson",
  email: "sarah@acmeinc.com",
  phone: "+1 (555) 123-4567",
  company: "Acme Inc.",
  website: "https://acmeinc.com",
  address: "123 Business St, San Francisco, CA 94102",
  status: "active",
  joinedDate: "2024-01-15",
  totalRevenue: 45000,
  projectsCount: 3,
  industry: "Technology",
  employees: "50-100",
  notes: "Great client, very responsive and professional. Interested in expanding to social media marketing.",
}

const projects = [
  {
    id: "1",
    name: "E-commerce Website Redesign",
    status: "in_progress",
    progress: 65,
    budget: 15000,
    spent: 9750,
    startDate: "2024-10-01",
    endDate: "2024-12-15",
  },
  {
    id: "2",
    name: "SEO Optimization Campaign",
    status: "in_progress",
    progress: 80,
    budget: 8000,
    spent: 6400,
    startDate: "2024-09-15",
    endDate: "2024-11-30",
  },
  {
    id: "3",
    name: "Brand Identity Refresh",
    status: "completed",
    progress: 100,
    budget: 12000,
    spent: 11500,
    startDate: "2024-07-01",
    endDate: "2024-09-30",
  },
]

const invoices = [
  {
    id: "INV-001",
    date: "2024-10-01",
    amount: 5000,
    status: "paid",
    dueDate: "2024-10-15",
  },
  {
    id: "INV-002",
    date: "2024-09-01",
    amount: 4000,
    status: "paid",
    dueDate: "2024-09-15",
  },
  {
    id: "INV-003",
    date: "2024-11-01",
    amount: 6000,
    status: "pending",
    dueDate: "2024-11-15",
  },
]

const activities = [
  {
    id: "1",
    type: "project_created",
    description: "Created new project: E-commerce Website Redesign",
    user: "John Doe",
    date: "2024-10-01",
  },
  {
    id: "2",
    type: "invoice_sent",
    description: "Sent invoice INV-001 ($5,000)",
    user: "System",
    date: "2024-10-01",
  },
  {
    id: "3",
    type: "payment_received",
    description: "Payment received for INV-002 ($4,000)",
    user: "System",
    date: "2024-09-16",
  },
  {
    id: "4",
    type: "meeting",
    description: "Completed kickoff meeting for Website Redesign project",
    user: "Sarah Johnson",
    date: "2024-10-02",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400"
    case "inactive":
      return "bg-gray-100 text-gray-700 dark:bg-gray-900/50 dark:text-gray-400"
    case "lead":
      return "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400"
    case "in_progress":
      return "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400"
    case "completed":
      return "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400"
    case "paid":
      return "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400"
    case "pending":
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-400"
    default:
      return "bg-gray-100 text-gray-700"
  }
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)
}

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
}

export default function ClientDetailPage() {
  const params = useParams()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button asChild variant="ghost" size="icon">
            <Link href="/dashboard/clients">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16 bg-gradient-to-br from-blue-600 to-emerald-500">
              <div className="flex h-full w-full items-center justify-center text-xl font-semibold text-white">
                {getInitials(client.name)}
              </div>
            </Avatar>
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                {client.name}
              </h2>
              <p className="mt-1 text-gray-600 dark:text-gray-400">
                {client.company}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button asChild variant="outline">
            <Link href={`/dashboard/clients/${params.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/projects/new?client=${params.id}`}>
                  Create Project
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/invoices/new?client=${params.id}`}>
                  Create Invoice
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Send Email</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                Delete Client
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(client.totalRevenue)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <FolderKanban className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{client.projectsCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
            <Activity className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <Badge variant="secondary" className={getStatusColor(client.status)}>
              {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Client Since</CardTitle>
            <Calendar className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-medium">
              {new Date(client.joinedDate).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <a
                      href={`mailto:${client.email}`}
                      className="font-medium text-blue-600 hover:underline dark:text-blue-400"
                    >
                      {client.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{client.phone}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Building className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Company</p>
                    <p className="font-medium">{client.company}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium">{client.address}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Company Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Industry</p>
                  <p className="font-medium">{client.industry}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Company Size</p>
                  <p className="font-medium">{client.employees} employees</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Website</p>
                  <a
                    href={client.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-blue-600 hover:underline dark:text-blue-400"
                  >
                    {client.website}
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300">{client.notes}</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Projects Tab */}
        <TabsContent value="projects" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Projects</CardTitle>
                <Button asChild size="sm">
                  <Link href={`/dashboard/projects/new?client=${params.id}`}>
                    Create Project
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="rounded-lg border border-gray-200 p-4 dark:border-gray-800"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <Link
                            href={`/dashboard/projects/${project.id}`}
                            className="font-semibold text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
                          >
                            {project.name}
                          </Link>
                          <Badge
                            variant="secondary"
                            className={getStatusColor(project.status)}
                          >
                            {project.status.replace("_", " ")}
                          </Badge>
                        </div>

                        <div className="mt-4 space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-medium">{project.progress}%</span>
                          </div>
                          <Progress value={project.progress} />
                        </div>

                        <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Budget</p>
                            <p className="font-medium">{formatCurrency(project.budget)}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Spent</p>
                            <p className="font-medium">{formatCurrency(project.spent)}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">End Date</p>
                            <p className="font-medium">{project.endDate}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Invoices Tab */}
        <TabsContent value="invoices">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Invoices</CardTitle>
                <Button asChild size="sm">
                  <Link href={`/dashboard/invoices/new?client=${params.id}`}>
                    Create Invoice
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell>
                        <Link
                          href={`/dashboard/invoices/${invoice.id}`}
                          className="font-medium text-blue-600 hover:underline dark:text-blue-400"
                        >
                          {invoice.id}
                        </Link>
                      </TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>{invoice.dueDate}</TableCell>
                      <TableCell className="font-medium">
                        {formatCurrency(invoice.amount)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={getStatusColor(invoice.status)}
                        >
                          {invoice.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Activity Log</CardTitle>
              <CardDescription>
                Recent activity and interactions with this client
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start space-x-4 rounded-lg border border-gray-200 p-4 dark:border-gray-800"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {activity.description}
                      </p>
                      <div className="mt-1 flex items-center space-x-2 text-sm text-gray-500">
                        <span>{activity.user}</span>
                        <span>•</span>
                        <span>{activity.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
