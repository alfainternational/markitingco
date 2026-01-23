"use client"

import * as React from "react"
import Link from "next/link"
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  TrendingUp,
  TrendingDown,
  Eye,
  MousePointerClick,
  DollarSign,
  Target,
} from "lucide-react"
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

interface Campaign {
  id: string
  name: string
  platform: string
  status: "active" | "paused" | "completed" | "draft"
  budget: number
  spent: number
  impressions: number
  clicks: number
  conversions: number
  ctr: number
  cpc: number
  startDate: string
  endDate: string
}

const campaigns: Campaign[] = [
  {
    id: "1",
    name: "Summer Sale 2024",
    platform: "Google Ads",
    status: "active",
    budget: 5000,
    spent: 3200,
    impressions: 156200,
    clicks: 12400,
    conversions: 342,
    ctr: 7.94,
    cpc: 0.26,
    startDate: "2024-10-01",
    endDate: "2024-11-30",
  },
  {
    id: "2",
    name: "Brand Awareness Campaign",
    platform: "Facebook",
    status: "active",
    budget: 8000,
    spent: 6100,
    impressions: 234500,
    clicks: 18200,
    conversions: 289,
    ctr: 7.76,
    cpc: 0.34,
    startDate: "2024-09-15",
    endDate: "2024-12-15",
  },
  {
    id: "3",
    name: "Product Launch",
    platform: "LinkedIn",
    status: "active",
    budget: 4000,
    spent: 2800,
    impressions: 89300,
    clicks: 6800,
    conversions: 156,
    ctr: 7.61,
    cpc: 0.41,
    startDate: "2024-10-15",
    endDate: "2024-11-15",
  },
  {
    id: "4",
    name: "Holiday Promotion",
    platform: "Instagram",
    status: "draft",
    budget: 6000,
    spent: 0,
    impressions: 0,
    clicks: 0,
    conversions: 0,
    ctr: 0,
    cpc: 0,
    startDate: "2024-12-01",
    endDate: "2024-12-31",
  },
  {
    id: "5",
    name: "Q3 Retargeting",
    platform: "Google Ads",
    status: "completed",
    budget: 3500,
    spent: 3450,
    impressions: 98700,
    clicks: 7200,
    conversions: 198,
    ctr: 7.29,
    cpc: 0.48,
    startDate: "2024-07-01",
    endDate: "2024-09-30",
  },
  {
    id: "6",
    name: "Local SEO Campaign",
    platform: "Google Ads",
    status: "paused",
    budget: 2500,
    spent: 1200,
    impressions: 45600,
    clicks: 3400,
    conversions: 87,
    ctr: 7.46,
    cpc: 0.35,
    startDate: "2024-10-01",
    endDate: "2024-11-30",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400"
    case "paused":
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-400"
    case "completed":
      return "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400"
    case "draft":
      return "bg-gray-100 text-gray-700 dark:bg-gray-900/50 dark:text-gray-400"
    default:
      return "bg-gray-100 text-gray-700"
  }
}

const getPlatformColor = (platform: string) => {
  switch (platform.toLowerCase()) {
    case "google ads":
      return "bg-blue-100 text-blue-700"
    case "facebook":
      return "bg-blue-600 text-white"
    case "instagram":
      return "bg-pink-100 text-pink-700"
    case "linkedin":
      return "bg-blue-800 text-white"
    case "twitter":
      return "bg-sky-100 text-sky-700"
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

const formatNumber = (num: number) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M"
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K"
  }
  return num.toString()
}

export default function CampaignsPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState<string>("all")
  const [platformFilter, setPlatformFilter] = React.useState<string>("all")

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || campaign.status === statusFilter
    const matchesPlatform = platformFilter === "all" || campaign.platform === platformFilter
    return matchesSearch && matchesStatus && matchesPlatform
  })

  const stats = {
    total: campaigns.length,
    active: campaigns.filter((c) => c.status === "active").length,
    totalBudget: campaigns.reduce((sum, c) => sum + c.budget, 0),
    totalSpent: campaigns.reduce((sum, c) => sum + c.spent, 0),
    totalImpressions: campaigns.reduce((sum, c) => sum + c.impressions, 0),
    totalClicks: campaigns.reduce((sum, c) => sum + c.clicks, 0),
    totalConversions: campaigns.reduce((sum, c) => sum + c.conversions, 0),
    avgCTR:
      campaigns.filter((c) => c.ctr > 0).reduce((sum, c) => sum + c.ctr, 0) /
      campaigns.filter((c) => c.ctr > 0).length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Campaigns
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage and track all your advertising campaigns
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/campaigns/new">
            <Plus className="mr-2 h-4 w-4" />
            New Campaign
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
            <Target className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.active}</div>
            <p className="mt-1 text-xs text-gray-500">
              of {stats.total} total campaigns
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Impressions</CardTitle>
            <Eye className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(stats.totalImpressions)}</div>
            <div className="mt-1 flex items-center text-xs">
              <TrendingUp className="mr-1 h-3 w-3 text-green-600" />
              <span className="text-green-600">+12.5%</span>
              <span className="ml-1 text-gray-500">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
            <MousePointerClick className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(stats.totalClicks)}</div>
            <p className="mt-1 text-xs text-gray-500">
              {stats.avgCTR.toFixed(2)}% average CTR
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.totalSpent)}</div>
            <p className="mt-1 text-xs text-gray-500">
              {((stats.totalSpent / stats.totalBudget) * 100).toFixed(1)}% of budget
            </p>
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
                  placeholder="Search campaigns..."
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
                  <SelectItem value="paused">Paused</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>

              <Select value={platformFilter} onValueChange={setPlatformFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Platforms</SelectItem>
                  <SelectItem value="Google Ads">Google Ads</SelectItem>
                  <SelectItem value="Facebook">Facebook</SelectItem>
                  <SelectItem value="Instagram">Instagram</SelectItem>
                  <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                  <SelectItem value="Twitter">Twitter</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* Campaigns Grid */}
          <div className="space-y-4">
            {filteredCampaigns.map((campaign) => (
              <Card key={campaign.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-4">
                      {/* Campaign Header */}
                      <div className="flex items-center justify-between">
                        <div>
                          <Link
                            href={`/dashboard/campaigns/${campaign.id}`}
                            className="text-lg font-semibold text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
                          >
                            {campaign.name}
                          </Link>
                          <div className="mt-1 flex items-center gap-2">
                            <Badge variant="secondary" className={getPlatformColor(campaign.platform)}>
                              {campaign.platform}
                            </Badge>
                            <Badge variant="secondary" className={getStatusColor(campaign.status)}>
                              {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                            </Badge>
                          </div>
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
                              <Link href={`/dashboard/campaigns/${campaign.id}`}>
                                View Details
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/campaigns/${campaign.id}/analytics`}>
                                View Analytics
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>Edit Campaign</DropdownMenuItem>
                            <DropdownMenuItem>
                              {campaign.status === "active" ? "Pause" : "Activate"} Campaign
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              Delete Campaign
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      {/* Budget Progress */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Budget Usage</span>
                          <span className="font-medium">
                            {formatCurrency(campaign.spent)} / {formatCurrency(campaign.budget)}
                          </span>
                        </div>
                        <Progress value={(campaign.spent / campaign.budget) * 100} />
                      </div>

                      {/* Campaign Metrics */}
                      <div className="grid grid-cols-5 gap-4 pt-4 border-t">
                        <div>
                          <p className="text-xs text-gray-500">Impressions</p>
                          <p className="mt-1 text-lg font-semibold">
                            {formatNumber(campaign.impressions)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Clicks</p>
                          <p className="mt-1 text-lg font-semibold">
                            {formatNumber(campaign.clicks)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">CTR</p>
                          <p className="mt-1 text-lg font-semibold">{campaign.ctr.toFixed(2)}%</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">CPC</p>
                          <p className="mt-1 text-lg font-semibold">${campaign.cpc.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Conversions</p>
                          <p className="mt-1 text-lg font-semibold">{campaign.conversions}</p>
                        </div>
                      </div>

                      {/* Campaign Dates */}
                      <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t">
                        <span>{campaign.startDate} → {campaign.endDate}</span>
                        <span>
                          {Math.ceil(
                            (new Date(campaign.endDate).getTime() - new Date().getTime()) /
                              (1000 * 60 * 60 * 24)
                          )}{" "}
                          days remaining
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCampaigns.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No campaigns found</p>
            </div>
          )}

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-500">
            Showing {filteredCampaigns.length} of {campaigns.length} campaigns
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
