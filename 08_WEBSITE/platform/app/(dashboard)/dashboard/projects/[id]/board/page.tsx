"use client"

import * as React from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  ArrowLeft,
  Plus,
  MoreHorizontal,
  Calendar,
  User,
  AlertCircle,
  CheckCircle2,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Task {
  id: string
  title: string
  description: string
  assignee: {
    name: string
    avatar: string
  }
  dueDate: string
  priority: "low" | "medium" | "high"
  tags: string[]
  subtasks: {
    completed: number
    total: number
  }
}

interface Column {
  id: string
  title: string
  tasks: Task[]
  color: string
}

const boardData: Column[] = [
  {
    id: "backlog",
    title: "Backlog",
    color: "bg-gray-500",
    tasks: [
      {
        id: "task-7",
        title: "User feedback analysis",
        description: "Analyze user feedback from beta testing phase",
        assignee: {
          name: "Lisa Wang",
          avatar: "LW",
        },
        dueDate: "2024-12-01",
        priority: "low",
        tags: ["Research", "UX"],
        subtasks: {
          completed: 0,
          total: 3,
        },
      },
      {
        id: "task-8",
        title: "Performance optimization",
        description: "Optimize page load times and improve Core Web Vitals",
        assignee: {
          name: "Mike Chen",
          avatar: "MC",
        },
        dueDate: "2024-12-05",
        priority: "medium",
        tags: ["Development", "Performance"],
        subtasks: {
          completed: 0,
          total: 5,
        },
      },
    ],
  },
  {
    id: "todo",
    title: "To Do",
    color: "bg-blue-500",
    tasks: [
      {
        id: "task-5",
        title: "Payment gateway integration",
        description: "Integrate Stripe payment gateway for checkout process",
        assignee: {
          name: "John Smith",
          avatar: "JS",
        },
        dueDate: "2024-11-20",
        priority: "high",
        tags: ["Development", "Payment"],
        subtasks: {
          completed: 1,
          total: 4,
        },
      },
      {
        id: "task-6",
        title: "Mobile responsiveness testing",
        description: "Test and fix responsive design issues on mobile devices",
        assignee: {
          name: "Lisa Wang",
          avatar: "LW",
        },
        dueDate: "2024-11-25",
        priority: "medium",
        tags: ["Testing", "Mobile"],
        subtasks: {
          completed: 0,
          total: 6,
        },
      },
    ],
  },
  {
    id: "in_progress",
    title: "In Progress",
    color: "bg-yellow-500",
    tasks: [
      {
        id: "task-3",
        title: "Product listing page",
        description: "Implement product listing page with filtering and sorting",
        assignee: {
          name: "Mike Chen",
          avatar: "MC",
        },
        dueDate: "2024-11-05",
        priority: "high",
        tags: ["Development", "Frontend"],
        subtasks: {
          completed: 3,
          total: 5,
        },
      },
      {
        id: "task-4",
        title: "Shopping cart functionality",
        description: "Build shopping cart with add/remove items and quantity management",
        assignee: {
          name: "Emma Davis",
          avatar: "ED",
        },
        dueDate: "2024-11-10",
        priority: "high",
        tags: ["Development", "Frontend"],
        subtasks: {
          completed: 4,
          total: 7,
        },
      },
    ],
  },
  {
    id: "review",
    title: "In Review",
    color: "bg-purple-500",
    tasks: [
      {
        id: "task-2",
        title: "Homepage frontend",
        description: "Completed homepage implementation awaiting review",
        assignee: {
          name: "Mike Chen",
          avatar: "MC",
        },
        dueDate: "2024-10-25",
        priority: "high",
        tags: ["Development", "Frontend"],
        subtasks: {
          completed: 5,
          total: 5,
        },
      },
    ],
  },
  {
    id: "completed",
    title: "Completed",
    color: "bg-green-500",
    tasks: [
      {
        id: "task-1",
        title: "Design mockups",
        description: "All design mockups and wireframes completed and approved",
        assignee: {
          name: "Sarah Johnson",
          avatar: "SJ",
        },
        dueDate: "2024-10-15",
        priority: "high",
        tags: ["Design", "UI/UX"],
        subtasks: {
          completed: 8,
          total: 8,
        },
      },
    ],
  },
]

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

const getPriorityIcon = (priority: string) => {
  switch (priority) {
    case "high":
      return <AlertCircle className="h-3 w-3" />
    case "medium":
      return <Clock className="h-3 w-3" />
    case "low":
      return <CheckCircle2 className="h-3 w-3" />
    default:
      return null
  }
}

export default function ProjectBoardPage() {
  const params = useParams()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button asChild variant="ghost" size="icon">
            <Link href={`/dashboard/projects/${params.id}`}>
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Project Board
            </h2>
            <p className="mt-1 text-gray-600 dark:text-gray-400">
              E-commerce Website Redesign
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline">Add Column</Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </div>
      </div>

      {/* Board Statistics */}
      <div className="grid gap-4 md:grid-cols-5">
        {boardData.map((column) => (
          <Card key={column.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{column.title}</CardTitle>
              <div className={`h-3 w-3 rounded-full ${column.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{column.tasks.length}</div>
              <p className="mt-1 text-xs text-gray-500">
                {column.tasks.reduce((sum, task) => sum + task.subtasks.total, 0)} subtasks
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Kanban Board */}
      <div className="overflow-x-auto">
        <div className="inline-flex min-w-full gap-4 pb-4">
          {boardData.map((column) => (
            <div key={column.id} className="w-80 flex-shrink-0">
              {/* Column Header */}
              <div className="mb-4 flex items-center justify-between rounded-t-lg bg-gray-50 p-3 dark:bg-gray-800">
                <div className="flex items-center space-x-2">
                  <div className={`h-2 w-2 rounded-full ${column.color}`} />
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {column.title}
                  </h3>
                  <Badge variant="secondary">{column.tasks.length}</Badge>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>

              {/* Task Cards */}
              <div className="space-y-3">
                {column.tasks.map((task) => (
                  <Card
                    key={task.id}
                    className="cursor-pointer transition-shadow hover:shadow-md"
                  >
                    <CardContent className="p-4">
                      {/* Task Header */}
                      <div className="flex items-start justify-between">
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {task.title}
                        </h4>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <MoreHorizontal className="h-3 w-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit Task</DropdownMenuItem>
                            <DropdownMenuItem>Change Status</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              Delete Task
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      {/* Task Description */}
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {task.description}
                      </p>

                      {/* Tags */}
                      <div className="mt-3 flex flex-wrap gap-1">
                        {task.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Priority and Subtasks */}
                      <div className="mt-3 flex items-center justify-between">
                        <Badge
                          variant="secondary"
                          className={`${getPriorityColor(task.priority)} flex items-center gap-1 text-xs`}
                        >
                          {getPriorityIcon(task.priority)}
                          {task.priority}
                        </Badge>
                        <div className="flex items-center text-xs text-gray-500">
                          <CheckCircle2 className="mr-1 h-3 w-3" />
                          {task.subtasks.completed}/{task.subtasks.total}
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="mt-3 flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-6 w-6 bg-gradient-to-br from-blue-600 to-emerald-500">
                            <div className="flex h-full w-full items-center justify-center text-[10px] font-semibold text-white">
                              {task.assignee.avatar}
                            </div>
                          </Avatar>
                          <span className="text-xs text-gray-600 dark:text-gray-400">
                            {task.assignee.name}
                          </span>
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar className="mr-1 h-3 w-3" />
                          {task.dueDate}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Add Task Button */}
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-500 hover:text-gray-900 dark:hover:text-white"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add task
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Priority Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <AlertCircle className="h-4 w-4 text-red-600" />
              </div>
              <span className="text-sm text-gray-600">High Priority</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <Clock className="h-4 w-4 text-yellow-600" />
              </div>
              <span className="text-sm text-gray-600">Medium Priority</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
              </div>
              <span className="text-sm text-gray-600">Low Priority</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
