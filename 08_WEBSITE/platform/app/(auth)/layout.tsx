import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Authentication | MarketingCo",
  description: "Sign in or create an account to access your MarketingCo dashboard",
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
