"use client"

import * as React from "react"
import Link from "next/link"
import {
  TrendingUp,
  TrendingDown,
  Users,
  FolderKanban,
  Megaphone,
  DollarSign,
  ArrowUpRight,
  ArrowRight,
  Calendar,
  Clock,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface StatCard {
  title: string
  value: string
  change: number
  changeLabel: string
  icon: React.ElementType
  iconColor: string
}

const stats: StatCard[] = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: 20.1,
    changeLabel: "from last month",
    icon: DollarSign,
    iconColor: "text-green-600 bg-green-100 dark:bg-green-900/50",
  },
  {
    title: "Active Clients",
    value: "32",
    change: 12.5,
    changeLabel: "from last month",
    icon: Users,
    iconColor: "text-blue-600 bg-blue-100 dark:bg-blue-900/50",
  },
  {
    title: "Active Projects",
    value: "18",
    change: -4.3,
    changeLabel: "from last month",
    icon: FolderKanban,
    iconColor: "text-purple-600 bg-purple-100 dark:bg-purple-900/50",
  },
  {
    title: "Running Campaigns",
    value: "24",
    change: 8.7,
    changeLabel: "from last month",
    icon: Megaphone,
    iconColor: "text-orange-600 bg-orange-100 dark:bg-orange-900/50",
  },
]

const recentProjects = [
  {
    id: 1,
    name: "E-commerce Website Redesign",
    client: "Acme Inc.",
    status: "in_progress",
    progress: 65,
    dueDate: "2024-12-15",
    team: 4,
  },
  {
    id: 2,
    name: "Social Media Marketing Campaign",
    client: "TechStart LLC",
    status: "in_progress",
    progress: 80,
    dueDate: "2024-11-30",
    team: 3,
  },
  {
    id: 3,
    name: "SEO Optimization",
    client: "GlobalCorp",
    status: "review",
    progress: 95,
    dueDate: "2024-11-25",
    team: 2,
  },
  {
    id: 4,
    name: "Email Marketing Automation",
    client: "RetailPro",
    status: "in_progress",
    progress: 45,
    dueDate: "2024-12-20",
    team: 3,
  },
]

const recentActivities = [
  {
    id: 1,
    user: "Sarah Johnson",
    action: "completed task",
    target: "Landing Page Design",
    time: "5 minutes ago",
    avatar: "SJ",
  },
  {
    id: 2,
    user: "Mike Chen",
    action: "added comment to",
    target: "Facebook Ad Campaign",
    time: "12 minutes ago",
    avatar: "MC",
  },
  {
    id: 3,
    user: "Emma Davis",
    action: "uploaded files to",
    target: "Brand Guidelines",
    time: "1 hour ago",
    avatar: "ED",
  },
  {
    id: 4,
    user: "John Smith",
    action: "created new",
    target: "Instagram Content Calendar",
    time: "2 hours ago",
    avatar: "JS",
  },
  {
    id: 5,
    user: "Lisa Wang",
    action: "updated",
    target: "Monthly Report Q4",
    time: "3 hours ago",
    avatar: "LW",
  },
]

const topCampaigns = [
  {
    id: 1,
    name: "Summer Sale 2024",
    platform: "Google Ads",
    impressions: "156.2K",
    clicks: "12.4K",
    ctr: "7.94%",
    spend: "$2,450",
    conversions: 342,
  },
  {
    id: 2,
    name: "Brand Awareness Campaign",
    platform: "Facebook",
    impressions: "234.5K",
    clicks: "18.2K",
    ctr: "7.76%",
    spend: "$3,200",
    conversions: 289,
  },
  {
    id: 3,
    name: "Product Launch",
    platform: "LinkedIn",
    impressions: "89.3K",
    clicks: "6.8K",
    ctr: "7.61%",
    spend: "$1,850",
    conversions: 156,
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "in_progress":
      return "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400"
    case "review":
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-400"
    case "completed":
      return "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400"
    default:
      return "bg-gray-100 text-gray-700 dark:bg-gray-900/50 dark:text-gray-400"
  }
}

const getStatusLabel = (status: string) => {
  switch (status) {
    case "in_progress":
      return "In Progress"
    case "review":
      return "In Review"
    case "completed":
      return "Completed"
    default:
      return status
  }
}

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Welcome back, John!
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Here's what's happening with your projects today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={`rounded-lg p-2 ${stat.iconColor}`}>
                <stat.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="mt-1 flex items-center text-xs">
                {stat.change > 0 ? (
                  <TrendingUp className="mr-1 h-4 w-4 text-green-600" />
                ) : (
                  <TrendingDown className="mr-1 h-4 w-4 text-red-600" />
                )}
                <span
                  className={
                    stat.change > 0 ? "text-green-600" : "text-red-600"
                  }
                >
                  {stat.change > 0 ? "+" : ""}
                  {stat.change}%
                </span>
                <span className="ml-1 text-gray-500">{stat.changeLabel}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Projects */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Projects</CardTitle>
                <CardDescription>
                  Track progress of your active projects
                </CardDescription>
              </div>
              <Button asChild variant="outline">
                <Link href="/dashboard/projects">
                  View all
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProjects.map((project) => (
                <div
                  key={project.id}
                  className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-800"
                >
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {project.name}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {project.client}
                        </p>
                      </div>
                      <Badge
                        variant="secondary"
                        className={getStatusColor(project.status)}
                      >
                        {getStatusLabel(project.status)}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">
                          Progress
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {project.progress}%
                        </span>
                      </div>
                      <Progress value={project.progress} />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-gray-500">
                        <Calendar className="mr-1 h-4 w-4" />
                        Due: {project.dueDate}
                      </div>
                      <div className="flex items-center text-gray-500">
                        <Users className="mr-1 h-4 w-4" />
                        {project.team} members
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates from your team</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <Avatar className="h-8 w-8 bg-gradient-to-br from-blue-600 to-emerald-500">
                    <div className="flex h-full w-full items-center justify-center text-xs font-semibold text-white">
                      {activity.avatar}
                    </div>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {activity.user}
                      </span>{" "}
                      <span className="text-gray-500">{activity.action}</span>{" "}
                      <span className="font-medium text-gray-900 dark:text-white">
                        {activity.target}
                      </span>
                    </p>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="mr-1 h-3 w-3" />
                      {activity.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button asChild variant="outline" className="mt-4 w-full">
              <Link href="/dashboard/activity">
                View all activity
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Top Performing Campaigns */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Top Campaigns</CardTitle>
                <CardDescription>Best performing campaigns this month</CardDescription>
              </div>
              <Button asChild variant="ghost" size="sm">
                <Link href="/dashboard/campaigns">View all</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign</TableHead>
                  <TableHead className="text-right">CTR</TableHead>
                  <TableHead className="text-right">Conversions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topCampaigns.map((campaign) => (
                  <TableRow key={campaign.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{campaign.name}</div>
                        <div className="text-sm text-gray-500">
                          {campaign.platform}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {campaign.ctr}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant="secondary">{campaign.conversions}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common tasks to help you get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button asChild className="h-20 flex-col">
              <Link href="/dashboard/clients/new">
                <Users className="mb-2 h-6 w-6" />
                Add New Client
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-20 flex-col">
              <Link href="/dashboard/projects/new">
                <FolderKanban className="mb-2 h-6 w-6" />
                Create Project
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-20 flex-col">
              <Link href="/dashboard/campaigns/new">
                <Megaphone className="mb-2 h-6 w-6" />
                Launch Campaign
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-20 flex-col">
              <Link href="/dashboard/reports/generate">
                <DollarSign className="mb-2 h-6 w-6" />
                Generate Report
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
