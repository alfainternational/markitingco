"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  Megaphone,
  FileText,
  BarChart3,
  FileSpreadsheet,
  DollarSign,
  Settings,
  ChevronDown,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface NavItem {
  title: string
  href: string
  icon: React.ElementType
  badge?: string
  children?: {
    title: string
    href: string
  }[]
}

const navigation: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Clients",
    href: "/dashboard/clients",
    icon: Users,
    badge: "12",
  },
  {
    title: "Projects",
    href: "/dashboard/projects",
    icon: FolderKanban,
    children: [
      { title: "All Projects", href: "/dashboard/projects" },
      { title: "Active", href: "/dashboard/projects?status=active" },
      { title: "Completed", href: "/dashboard/projects?status=completed" },
      { title: "On Hold", href: "/dashboard/projects?status=on-hold" },
    ],
  },
  {
    title: "Campaigns",
    href: "/dashboard/campaigns",
    icon: Megaphone,
    children: [
      { title: "All Campaigns", href: "/dashboard/campaigns" },
      { title: "Google Ads", href: "/dashboard/campaigns?platform=google" },
      { title: "Facebook", href: "/dashboard/campaigns?platform=facebook" },
      { title: "LinkedIn", href: "/dashboard/campaigns?platform=linkedin" },
    ],
  },
  {
    title: "Content",
    href: "/dashboard/content",
    icon: FileText,
    children: [
      { title: "Calendar", href: "/dashboard/content/calendar" },
      { title: "Library", href: "/dashboard/content" },
      { title: "Create", href: "/dashboard/content/new" },
    ],
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
    children: [
      { title: "Overview", href: "/dashboard/analytics" },
      { title: "Website", href: "/dashboard/analytics/website" },
      { title: "Social Media", href: "/dashboard/analytics/social" },
      { title: "Campaigns", href: "/dashboard/analytics/campaigns" },
    ],
  },
  {
    title: "Reports",
    href: "/dashboard/reports",
    icon: FileSpreadsheet,
  },
  {
    title: "Invoices",
    href: "/dashboard/invoices",
    icon: DollarSign,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    children: [
      { title: "Profile", href: "/dashboard/settings/profile" },
      { title: "Company", href: "/dashboard/settings/company" },
      { title: "Team", href: "/dashboard/settings/team" },
      { title: "Billing", href: "/dashboard/settings/billing" },
      { title: "Integrations", href: "/dashboard/settings/integrations" },
    ],
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = React.useState<string[]>([])

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    )
  }

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center border-b border-gray-200 px-6 dark:border-gray-800">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-emerald-500" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              MarketingCo
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            const isExpanded = expandedItems.includes(item.title)
            const hasChildren = item.children && item.children.length > 0

            return (
              <div key={item.title}>
                <Link
                  href={item.href}
                  className={cn(
                    "group flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                  )}
                  onClick={(e) => {
                    if (hasChildren) {
                      e.preventDefault()
                      toggleExpanded(item.title)
                    }
                  }}
                >
                  <div className="flex items-center">
                    <item.icon className="mr-3 h-5 w-5" />
                    <span>{item.title}</span>
                  </div>

                  {item.badge && (
                    <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-600 dark:bg-blue-900 dark:text-blue-400">
                      {item.badge}
                    </span>
                  )}

                  {hasChildren && (
                    <div>
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </div>
                  )}
                </Link>

                {/* Submenu */}
                {hasChildren && isExpanded && (
                  <div className="ml-8 mt-1 space-y-1">
                    {item.children!.map((child) => {
                      const isChildActive = pathname === child.href
                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            "block rounded-lg px-3 py-2 text-sm transition-colors",
                            isChildActive
                              ? "font-medium text-blue-600 dark:text-blue-400"
                              : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                          )}
                        >
                          {child.title}
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        {/* User Section */}
        <div className="border-t border-gray-200 p-4 dark:border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-emerald-500" />
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                John Doe
              </p>
              <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                john@example.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
