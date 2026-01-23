"use client"

import * as React from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  ArrowLeft,
  Calendar,
  DollarSign,
  Users,
  Edit,
  MoreHorizontal,
  CheckCircle2,
  Clock,
  FileText,
  TrendingUp,
  Kanban,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
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
import { Avatar } from "@/components/ui/avatar"

// Mock data
const project = {
  id: "1",
  name: "E-commerce Website Redesign",
  client: "Acme Inc.",
  clientId: "1",
  type: "WEB_DEVELOPMENT",
  status: "in_progress",
  progress: 65,
  budget: 15000,
  spent: 9750,
  startDate: "2024-10-01",
  endDate: "2024-12-15",
  description:
    "Complete redesign of the e-commerce platform with modern UI/UX, improved performance, mobile responsiveness, and enhanced user experience. This project includes frontend development, backend optimization, and integration with third-party services.",
  objectives: [
    "Modernize the user interface with contemporary design patterns",
    "Improve page load times by 50%",
    "Increase mobile conversion rate by 30%",
    "Implement responsive design for all devices",
    "Integrate with payment gateway and shipping APIs",
  ],
}

const tasks = [
  {
    id: "1",
    title: "Design mockups and wireframes",
    status: "completed",
    assignee: "Sarah Johnson",
    dueDate: "2024-10-15",
    priority: "high",
  },
  {
    id: "2",
    title: "Frontend development - Homepage",
    status: "completed",
    assignee: "Mike Chen",
    dueDate: "2024-10-25",
    priority: "high",
  },
  {
    id: "3",
    title: "Product listing page implementation",
    status: "in_progress",
    assignee: "Mike Chen",
    dueDate: "2024-11-05",
    priority: "high",
  },
  {
    id: "4",
    title: "Shopping cart functionality",
    status: "in_progress",
    assignee: "Emma Davis",
    dueDate: "2024-11-10",
    priority: "high",
  },
  {
    id: "5",
    title: "Payment gateway integration",
    status: "pending",
    assignee: "John Smith",
    dueDate: "2024-11-20",
    priority: "high",
  },
  {
    id: "6",
    title: "Mobile responsiveness testing",
    status: "pending",
    assignee: "Lisa Wang",
    dueDate: "2024-11-25",
    priority: "medium",
  },
]

const team = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "UI/UX Designer",
    avatar: "SJ",
    tasksCompleted: 8,
    totalTasks: 10,
  },
  {
    id: "2",
    name: "Mike Chen",
    role: "Frontend Developer",
    avatar: "MC",
    tasksCompleted: 12,
    totalTasks: 18,
  },
  {
    id: "3",
    name: "Emma Davis",
    role: "Backend Developer",
    avatar: "ED",
    tasksCompleted: 6,
    totalTasks: 12,
  },
  {
    id: "4",
    name: "John Smith",
    role: "Full Stack Developer",
    avatar: "JS",
    tasksCompleted: 5,
    totalTasks: 8,
  },
]

const milestones = [
  {
    id: "1",
    name: "Design Phase Complete",
    date: "2024-10-15",
    status: "completed",
    description: "All mockups and wireframes approved",
  },
  {
    id: "2",
    name: "Frontend Development - Phase 1",
    date: "2024-11-10",
    status: "in_progress",
    description: "Main pages implementation",
  },
  {
    id: "3",
    name: "Backend Integration",
    date: "2024-11-25",
    status: "pending",
    description: "API integration and payment gateway",
  },
  {
    id: "4",
    name: "Testing and QA",
    date: "2024-12-05",
    status: "pending",
    description: "Comprehensive testing across all devices",
  },
  {
    id: "5",
    name: "Launch",
    date: "2024-12-15",
    status: "pending",
    description: "Final deployment and go-live",
  },
]

const activityLog = [
  {
    id: "1",
    user: "Mike Chen",
    action: "completed task",
    target: "Frontend development - Homepage",
    time: "2 hours ago",
  },
  {
    id: "2",
    user: "Sarah Johnson",
    action: "uploaded files to",
    target: "Design Assets",
    time: "4 hours ago",
  },
  {
    id: "3",
    user: "Emma Davis",
    action: "commented on",
    target: "Shopping cart functionality",
    time: "5 hours ago",
  },
  {
    id: "4",
    user: "John Smith",
    action: "updated budget for",
    target: "Payment gateway integration",
    time: "Yesterday",
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
    case "pending":
      return "bg-gray-100 text-gray-700 dark:bg-gray-900/50 dark:text-gray-400"
    case "on_hold":
      return "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400"
    default:
      return "bg-gray-100 text-gray-700"
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400"
    case "medium":
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-400"
    case "low":
      return "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400"
    default:
      return "bg-gray-100 text-gray-700"
  }
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(amount)
}

const getStatusLabel = (status: string) => {
  return status
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export default function ProjectDetailPage() {
  const params = useParams()

  const budgetRemaining = project.budget - project.spent
  const budgetPercentage = (project.spent / project.budget) * 100

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button asChild variant="ghost" size="icon">
            <Link href="/dashboard/projects">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              {project.name}
            </h2>
            <p className="mt-1 text-gray-600 dark:text-gray-400">
              Client:{" "}
              <Link
                href={`/dashboard/clients/${project.clientId}`}
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                {project.client}
              </Link>
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button asChild variant="outline">
            <Link href={`/dashboard/projects/${params.id}/board`}>
              <Kanban className="mr-2 h-4 w-4" />
              View Board
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={`/dashboard/projects/${params.id}/edit`}>
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
              <DropdownMenuItem>Create Campaign</DropdownMenuItem>
              <DropdownMenuItem>Generate Report</DropdownMenuItem>
              <DropdownMenuItem>Archive Project</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">Delete Project</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant="secondary" className={getStatusColor(project.status)}>
              {getStatusLabel(project.status)}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{project.progress}%</div>
            <Progress value={project.progress} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(project.budget)}</div>
            <p className="mt-1 text-xs text-gray-500">
              {formatCurrency(budgetRemaining)} remaining
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Size</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{team.length}</div>
            <p className="mt-1 text-xs text-gray-500">Active members</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Deadline</CardTitle>
            <Calendar className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-medium">{project.endDate}</div>
            <p className="mt-1 text-xs text-gray-500">End date</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Project Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300">{project.description}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Budget Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Spent</span>
                    <span className="font-medium">{formatCurrency(project.spent)}</span>
                  </div>
                  <Progress value={budgetPercentage} />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Budget</span>
                    <span className="font-medium">{formatCurrency(project.budget)}</span>
                  </div>
                </div>

                <div className="pt-4 border-t space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Remaining</span>
                    <span className="font-medium">{formatCurrency(budgetRemaining)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Utilization</span>
                    <span className="font-medium">{budgetPercentage.toFixed(1)}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Project Objectives</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {project.objectives.map((objective, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{objective}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Project Timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Start Date</p>
                  <p className="font-medium">{project.startDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">End Date</p>
                  <p className="font-medium">{project.endDate}</p>
                </div>
              </div>
              <div className="pt-4 border-t">
                <p className="text-sm text-gray-500">Duration</p>
                <p className="font-medium">
                  {Math.ceil(
                    (new Date(project.endDate).getTime() -
                      new Date(project.startDate).getTime()) /
                      (1000 * 60 * 60 * 24)
                  )}{" "}
                  days
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tasks Tab */}
        <TabsContent value="tasks">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Project Tasks</CardTitle>
                  <CardDescription>
                    {tasks.filter((t) => t.status === "completed").length} of {tasks.length}{" "}
                    tasks completed
                  </CardDescription>
                </div>
                <Button size="sm">Add Task</Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task</TableHead>
                    <TableHead>Assignee</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell className="font-medium">{task.title}</TableCell>
                      <TableCell>{task.assignee}</TableCell>
                      <TableCell>{task.dueDate}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={getPriorityColor(task.priority)}>
                          {task.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={getStatusColor(task.status)}>
                          {getStatusLabel(task.status)}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Team Tab */}
        <TabsContent value="team">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Team Members</CardTitle>
                <Button size="sm">Add Member</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {team.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-800"
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12 bg-gradient-to-br from-blue-600 to-emerald-500">
                        <div className="flex h-full w-full items-center justify-center text-lg font-semibold text-white">
                          {member.avatar}
                        </div>
                      </Avatar>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {member.name}
                        </p>
                        <p className="text-sm text-gray-500">{member.role}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        {member.tasksCompleted} / {member.totalTasks} tasks
                      </p>
                      <Progress
                        value={(member.tasksCompleted / member.totalTasks) * 100}
                        className="mt-2 w-32"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Milestones Tab */}
        <TabsContent value="milestones">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Project Milestones</CardTitle>
                <Button size="sm">Add Milestone</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {milestones.map((milestone, index) => (
                  <div key={milestone.id} className="relative pl-8">
                    {index !== milestones.length - 1 && (
                      <div className="absolute left-3 top-8 h-full w-0.5 bg-gray-200 dark:bg-gray-700" />
                    )}
                    <div className="absolute left-0 top-1">
                      {milestone.status === "completed" ? (
                        <CheckCircle2 className="h-6 w-6 text-green-600" />
                      ) : milestone.status === "in_progress" ? (
                        <Clock className="h-6 w-6 text-blue-600" />
                      ) : (
                        <div className="h-6 w-6 rounded-full border-2 border-gray-300 dark:border-gray-600" />
                      )}
                    </div>
                    <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-800">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {milestone.name}
                          </h4>
                          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            {milestone.description}
                          </p>
                          <p className="mt-2 text-sm text-gray-500">Due: {milestone.date}</p>
                        </div>
                        <Badge variant="secondary" className={getStatusColor(milestone.status)}>
                          {getStatusLabel(milestone.status)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates and changes to the project</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activityLog.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start space-x-4 rounded-lg border border-gray-200 p-4 dark:border-gray-800"
                  >
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium text-gray-900 dark:text-white">
                          {activity.user}
                        </span>{" "}
                        <span className="text-gray-500">{activity.action}</span>{" "}
                        <span className="font-medium text-gray-900 dark:text-white">
                          {activity.target}
                        </span>
                      </p>
                      <p className="mt-1 text-xs text-gray-500">{activity.time}</p>
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
