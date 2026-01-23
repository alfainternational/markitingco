"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Loader2, CheckCircle, AlertCircle, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function VerifyEmailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const email = searchParams.get("email")

  const [status, setStatus] = React.useState<"loading" | "success" | "error">("loading")
  const [error, setError] = React.useState<string | null>(null)
  const [resending, setResending] = React.useState(false)
  const [resendSuccess, setResendSuccess] = React.useState(false)

  React.useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setStatus("error")
        setError("No verification token provided")
        return
      }

      try {
        // TODO: Implement actual email verification API
        const response = await fetch("/api/auth/verify-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        })

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.message || "Verification failed")
        }

        setStatus("success")

        // Redirect to dashboard after 3 seconds
        setTimeout(() => {
          router.push("/dashboard")
        }, 3000)
      } catch (err) {
        setStatus("error")
        setError(err instanceof Error ? err.message : "Verification failed")
      }
    }

    if (token) {
      verifyEmail()
    }
  }, [token, router])

  const handleResendEmail = async () => {
    if (!email) return

    setResending(true)
    setResendSuccess(false)

    try {
      // TODO: Implement actual resend verification email API
      const response = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to resend email")
      }

      setResendSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to resend email")
    } finally {
      setResending(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-emerald-50 px-4 py-12 dark:from-gray-900 dark:to-gray-800 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              MarketingCo
            </h1>
          </Link>
        </div>

        {/* Verification Content */}
        <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
          {status === "loading" && (
            <div className="space-y-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                <Loader2 className="h-6 w-6 animate-spin text-blue-600 dark:text-blue-400" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Verifying your email...
                </h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Please wait while we verify your email address
                </p>
              </div>
            </div>
          )}

          {status === "success" && (
            <div className="space-y-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Email verified successfully!
                </h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Your account is now active. Redirecting to dashboard...
                </p>
              </div>

              <Button asChild className="w-full" size="lg">
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
            </div>
          )}

          {status === "error" && !token && email && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                  <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>

                <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
                  Verify your email
                </h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  We've sent a verification link to <strong>{email}</strong>
                </p>
              </div>

              {resendSuccess && (
                <Alert variant="success">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    Verification email sent successfully! Check your inbox.
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-4 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  What's next?
                </h3>
                <ol className="list-decimal space-y-2 pl-5 text-sm text-gray-600 dark:text-gray-400">
                  <li>Check your inbox for an email from us</li>
                  <li>Click the verification link in the email</li>
                  <li>Your account will be activated automatically</li>
                </ol>
              </div>

              <div className="space-y-3">
                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                  Didn't receive the email?
                </p>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={handleResendEmail}
                  disabled={resending}
                >
                  {resending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Resending...
                    </>
                  ) : (
                    "Resend verification email"
                  )}
                </Button>
              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Tip:</strong> Check your spam folder if you don't see the email in your inbox.
                </p>
              </div>
            </div>
          )}

          {status === "error" && token && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
                  <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>

                <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
                  Verification failed
                </h2>
              </div>

              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Invalid or expired verification link</AlertTitle>
                <AlertDescription>
                  {error || "This verification link is invalid or has expired. Please request a new one."}
                </AlertDescription>
              </Alert>

              {email && (
                <div className="space-y-3">
                  <Button
                    type="button"
                    className="w-full"
                    size="lg"
                    onClick={handleResendEmail}
                    disabled={resending}
                  >
                    {resending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Resending...
                      </>
                    ) : (
                      "Request new verification email"
                    )}
                  </Button>
                </div>
              )}

              <div className="space-y-2">
                <Button asChild variant="outline" className="w-full" size="lg">
                  <Link href="/register">Create new account</Link>
                </Button>
                <Button asChild variant="outline" className="w-full" size="lg">
                  <Link href="/login">Back to sign in</Link>
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Help Text */}
        <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
          <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
            Need help?
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            If you're having trouble verifying your email, please{" "}
            <Link
              href="/support"
              className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
            >
              contact our support team
            </Link>{" "}
            for assistance.
          </p>
        </div>
      </div>
    </div>
  )
}
