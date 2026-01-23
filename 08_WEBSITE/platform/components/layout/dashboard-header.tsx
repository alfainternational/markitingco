"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { Bell, Search, Menu, Sun, Moon, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

interface DashboardHeaderProps {
  onMenuClick?: () => void
}

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  const pathname = usePathname()
  const [theme, setTheme] = React.useState<"light" | "dark">("light")
  const [language, setLanguage] = React.useState<"en" | "ar">("en")

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
    // TODO: Implement actual theme switching
  }

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en")
    // TODO: Implement actual language switching
  }

  const getPageTitle = () => {
    const pathSegments = pathname.split("/").filter(Boolean)
    if (pathSegments.length === 1) return "Dashboard"
    return pathSegments[pathSegments.length - 1]
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-gray-200 bg-white px-4 dark:border-gray-800 dark:bg-gray-900 sm:px-6 lg:px-8">
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={onMenuClick}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Page Title */}
      <div className="flex-1">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
          {getPageTitle()}
        </h1>
      </div>

      {/* Search */}
      <div className="hidden md:flex md:flex-1 md:max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-10"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Language Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleLanguage}
          title={language === "en" ? "Switch to Arabic" : "Switch to English"}
        >
          <Globe className="h-5 w-5" />
          <span className="sr-only">Toggle language</span>
        </Button>

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
        >
          {theme === "light" ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
              <span className="sr-only">Notifications</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              <span>Notifications</span>
              <Badge variant="secondary">3 new</Badge>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-80 overflow-y-auto">
              <DropdownMenuItem className="flex flex-col items-start p-4">
                <div className="flex w-full items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium">New campaign launched</p>
                    <p className="mt-1 text-sm text-gray-500">
                      Google Ads campaign "Summer Sale 2024" is now live
                    </p>
                  </div>
                  <span className="ml-2 h-2 w-2 rounded-full bg-blue-500" />
                </div>
                <p className="mt-2 text-xs text-gray-400">5 minutes ago</p>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex flex-col items-start p-4">
                <div className="flex w-full items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium">Invoice payment received</p>
                    <p className="mt-1 text-sm text-gray-500">
                      $2,500.00 from Acme Inc.
                    </p>
                  </div>
                  <span className="ml-2 h-2 w-2 rounded-full bg-green-500" />
                </div>
                <p className="mt-2 text-xs text-gray-400">1 hour ago</p>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex flex-col items-start p-4">
                <div className="flex w-full items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium">Report ready</p>
                    <p className="mt-1 text-sm text-gray-500">
                      Monthly analytics report for October is ready
                    </p>
                  </div>
                  <span className="ml-2 h-2 w-2 rounded-full bg-blue-500" />
                </div>
                <p className="mt-2 text-xs text-gray-400">2 hours ago</p>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center font-medium text-blue-600">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-emerald-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-gray-500">john@example.com</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
