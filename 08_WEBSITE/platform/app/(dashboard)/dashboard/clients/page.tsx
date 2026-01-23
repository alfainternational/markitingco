"use client"

import * as React from "react"
import Link from "next/link"
import { Plus, Search, Filter, MoreHorizontal, Mail, Phone, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar } from "@/components/ui/avatar"

interface Client {
  id: string
  name: string
  email: string
  phone: string
  company: string
  status: "active" | "inactive" | "lead"
  projectsCount: number
  totalRevenue: number
  joinedDate: string
  avatar?: string
}

const clients: Client[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@acmeinc.com",
    phone: "+1 (555) 123-4567",
    company: "Acme Inc.",
    status: "active",
    projectsCount: 3,
    totalRevenue: 45000,
    joinedDate: "2024-01-15",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "m.chen@techstart.io",
    phone: "+1 (555) 234-5678",
    company: "TechStart LLC",
    status: "active",
    projectsCount: 2,
    totalRevenue: 32000,
    joinedDate: "2024-02-20",
  },
  {
    id: "3",
    name: "Emma Davis",
    email: "emma@globalcorp.com",
    phone: "+1 (555) 345-6789",
    company: "GlobalCorp",
    status: "active",
    projectsCount: 5,
    totalRevenue: 78000,
    joinedDate: "2023-11-10",
  },
  {
    id: "4",
    name: "James Wilson",
    email: "jwilson@retailpro.com",
    phone: "+1 (555) 456-7890",
    company: "RetailPro",
    status: "inactive",
    projectsCount: 1,
    totalRevenue: 15000,
    joinedDate: "2023-08-05",
  },
  {
    id: "5",
    name: "Lisa Anderson",
    email: "lisa@startup.co",
    phone: "+1 (555) 567-8901",
    company: "Startup Co.",
    status: "lead",
    projectsCount: 0,
    totalRevenue: 0,
    joinedDate: "2024-10-01",
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
    default:
      return "bg-gray-100 text-gray-700"
  }
}

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)
}

export default function ClientsPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState<string>("all")

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.company.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus =
      statusFilter === "all" || client.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Clients
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage your clients and their projects
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/clients/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Client
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Building className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clients.length}</div>
            <p className="mt-1 text-xs text-gray-500">
              {clients.filter((c) => c.status === "active").length} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <Building className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(clients.reduce((sum, c) => sum + c.totalRevenue, 0))}
            </div>
            <p className="mt-1 text-xs text-gray-500">From all clients</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Building className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {clients.reduce((sum, c) => sum + c.projectsCount, 0)}
            </div>
            <p className="mt-1 text-xs text-gray-500">Across all clients</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 items-center gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search clients..."
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
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="lead">Lead</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* Clients Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Projects</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-gray-500">
                      No clients found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredClients.map((client) => (
                    <TableRow key={client.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10 bg-gradient-to-br from-blue-600 to-emerald-500">
                            <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-white">
                              {getInitials(client.name)}
                            </div>
                          </Avatar>
                          <div>
                            <Link
                              href={`/dashboard/clients/${client.id}`}
                              className="font-medium text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
                            >
                              {client.name}
                            </Link>
                            <p className="text-sm text-gray-500">{client.company}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <Mail className="mr-2 h-4 w-4 text-gray-400" />
                            <a
                              href={`mailto:${client.email}`}
                              className="text-blue-600 hover:underline dark:text-blue-400"
                            >
                              {client.email}
                            </a>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Phone className="mr-2 h-4 w-4 text-gray-400" />
                            {client.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={getStatusColor(client.status)}
                        >
                          {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {client.projectsCount}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {formatCurrency(client.totalRevenue)}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/clients/${client.id}`}>
                                View Details
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/clients/${client.id}/edit`}>
                                Edit Client
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/projects/new?client=${client.id}`}>
                                Create Project
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              Delete Client
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination Info */}
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Showing {filteredClients.length} of {clients.length} clients
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
