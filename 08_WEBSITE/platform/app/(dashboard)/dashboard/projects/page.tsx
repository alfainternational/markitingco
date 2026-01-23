"use client"

import * as React from "react"
import Link from "next/link"
import { Plus, Search, Filter, MoreHorizontal, Calendar, DollarSign, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Project {
  id: string
  name: string
  client: string
  type: string
  status: "planning" | "in_progress" | "review" | "completed" | "on_hold"
  progress: number
  budget: number
  spent: number
  startDate: string
  endDate: string
  team: number
  description: string
}

const projects: Project[] = [
  {
    id: "1",
    name: "E-commerce Website Redesign",
    client: "Acme Inc.",
    type: "WEB_DEVELOPMENT",
    status: "in_progress",
    progress: 65,
    budget: 15000,
    spent: 9750,
    startDate: "2024-10-01",
    endDate: "2024-12-15",
    team: 4,
    description: "Complete redesign of the e-commerce platform with modern UI/UX",
  },
  {
    id: "2",
    name: "SEO Optimization Campaign",
    client: "Acme Inc.",
    type: "SEO",
    status: "in_progress",
    progress: 80,
    budget: 8000,
    spent: 6400,
    startDate: "2024-09-15",
    endDate: "2024-11-30",
    team: 2,
    description: "On-page and off-page SEO optimization for improved search rankings",
  },
  {
    id: "3",
    name: "Social Media Marketing",
    client: "TechStart LLC",
    type: "SOCIAL_MEDIA",
    status: "in_progress",
    progress: 45,
    budget: 12000,
    spent: 5400,
    startDate: "2024-11-01",
    endDate: "2025-01-31",
    team: 3,
    description: "Comprehensive social media strategy across multiple platforms",
  },
  {
    id: "4",
    name: "Brand Identity Refresh",
    client: "GlobalCorp",
    type: "BRANDING",
    status: "completed",
    progress: 100,
    budget: 20000,
    spent: 19500,
    startDate: "2024-07-01",
    endDate: "2024-09-30",
    team: 5,
    description: "Complete brand identity redesign including logo, colors, and guidelines",
  },
  {
    id: "5",
    name: "PPC Campaign - Google Ads",
    client: "RetailPro",
    type: "PPC",
    status: "review",
    progress: 90,
    budget: 10000,
    spent: 9000,
    startDate: "2024-10-15",
    endDate: "2024-11-15",
    team: 2,
    description: "Google Ads campaign for holiday season promotion",
  },
  {
    id: "6",
    name: "Content Marketing Strategy",
    client: "Startup Co.",
    type: "CONTENT_MARKETING",
    status: "planning",
    progress: 15,
    budget: 7000,
    spent: 1050,
    startDate: "2024-11-20",
    endDate: "2025-02-20",
    team: 3,
    description: "Blog posts, whitepapers, and content calendar creation",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "planning":
      return "bg-gray-100 text-gray-700 dark:bg-gray-900/50 dark:text-gray-400"
    case "in_progress":
      return "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400"
    case "review":
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-400"
    case "completed":
      return "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400"
    case "on_hold":
      return "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400"
    default:
      return "bg-gray-100 text-gray-700"
  }
}

const getStatusLabel = (status: string) => {
  return status
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(amount)
}

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState<string>("all")
  const [typeFilter, setTypeFilter] = React.useState<string>("all")
  const [view, setView] = React.useState<"grid" | "list">("grid")

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus =
      statusFilter === "all" || project.status === statusFilter

    const matchesType = typeFilter === "all" || project.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const stats = {
    total: projects.length,
    inProgress: projects.filter((p) => p.status === "in_progress").length,
    completed: projects.filter((p) => p.status === "completed").length,
    totalBudget: projects.reduce((sum, p) => sum + p.budget, 0),
    totalSpent: projects.reduce((sum, p) => sum + p.spent, 0),
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Projects
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage and track all your marketing projects
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/projects/new">
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="mt-1 text-xs text-gray-500">
              {stats.inProgress} in progress
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.inProgress}</div>
            <p className="mt-1 text-xs text-gray-500">Currently active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.totalBudget)}</div>
            <p className="mt-1 text-xs text-gray-500">Across all projects</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget Used</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.totalSpent)}</div>
            <p className="mt-1 text-xs text-gray-500">
              {((stats.totalSpent / stats.totalBudget) * 100).toFixed(1)}% of total
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 items-center gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="planning">Planning</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="review">Review</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="on_hold">On Hold</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="SEO">SEO</SelectItem>
                  <SelectItem value="PPC">PPC</SelectItem>
                  <SelectItem value="SOCIAL_MEDIA">Social Media</SelectItem>
                  <SelectItem value="CONTENT_MARKETING">Content Marketing</SelectItem>
                  <SelectItem value="BRANDING">Branding</SelectItem>
                  <SelectItem value="WEB_DEVELOPMENT">Web Development</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs value={view} onValueChange={(v) => setView(v as "grid" | "list")}>
            <TabsList className="mb-4">
              <TabsTrigger value="grid">Grid View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>

            {/* Grid View */}
            <TabsContent value="grid">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredProjects.map((project) => (
                  <Card key={project.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <Link
                            href={`/dashboard/projects/${project.id}`}
                            className="font-semibold text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
                          >
                            {project.name}
                          </Link>
                          <p className="mt-1 text-sm text-gray-500">{project.client}</p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/projects/${project.id}`}>
                                View Details
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/projects/${project.id}/board`}>
                                Open Board
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>Edit Project</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              Delete Project
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className={getStatusColor(project.status)}>
                          {getStatusLabel(project.status)}
                        </Badge>
                        <Badge variant="outline">{project.type.replace("_", " ")}</Badge>
                      </div>

                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {project.description}
                      </p>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-medium">{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} />
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-4 border-t text-sm">
                        <div>
                          <p className="text-gray-500">Budget</p>
                          <p className="font-medium">{formatCurrency(project.budget)}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Spent</p>
                          <p className="font-medium">{formatCurrency(project.spent)}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t text-sm">
                        <div className="flex items-center text-gray-500">
                          <Calendar className="mr-1 h-4 w-4" />
                          {project.endDate}
                        </div>
                        <div className="flex items-center text-gray-500">
                          <Users className="mr-1 h-4 w-4" />
                          {project.team} members
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredProjects.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No projects found</p>
                </div>
              )}
            </TabsContent>

            {/* List View */}
            <TabsContent value="list">
              <div className="space-y-4">
                {filteredProjects.map((project) => (
                  <Card key={project.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <Link
                                href={`/dashboard/projects/${project.id}`}
                                className="text-lg font-semibold text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
                              >
                                {project.name}
                              </Link>
                              <p className="text-sm text-gray-500">{project.client}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className={getStatusColor(project.status)}>
                                {getStatusLabel(project.status)}
                              </Badge>
                              <Badge variant="outline">{project.type.replace("_", " ")}</Badge>
                            </div>
                          </div>

                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {project.description}
                          </p>

                          <div className="grid grid-cols-4 gap-4">
                            <div>
                              <p className="text-xs text-gray-500">Progress</p>
                              <div className="mt-1 space-y-1">
                                <p className="text-sm font-medium">{project.progress}%</p>
                                <Progress value={project.progress} className="h-1" />
                              </div>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Budget</p>
                              <p className="mt-1 text-sm font-medium">{formatCurrency(project.budget)}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">End Date</p>
                              <p className="mt-1 text-sm font-medium">{project.endDate}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Team</p>
                              <p className="mt-1 text-sm font-medium">{project.team} members</p>
                            </div>
                          </div>
                        </div>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="ml-4">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/projects/${project.id}`}>
                                View Details
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/projects/${project.id}/board`}>
                                Open Board
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>Edit Project</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              Delete Project
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredProjects.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No projects found</p>
                </div>
              )}
            </TabsContent>
          </Tabs>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-500">
            Showing {filteredProjects.length} of {projects.length} projects
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
