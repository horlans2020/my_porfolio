"use client"

import { type ReactNode, useState, useEffect } from "react"
import { ConvexProvider as ConvexReactProvider, ConvexReactClient } from "convex/react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

export function ConvexProvider({ children }: { children: ReactNode }) {
  const [client, setClient] = useState<ConvexReactClient | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL

    if (!convexUrl) {
      setError("Convex URL is not set. Please add NEXT_PUBLIC_CONVEX_URL to your environment variables.")
      return
    }

    try {
      const newClient = new ConvexReactClient(convexUrl)
      setClient(newClient)
    } catch (err) {
      setError("Failed to initialize Convex client. Please check your Convex URL.")
      console.error("Convex initialization error:", err)
    }
  }, [])

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Alert variant="destructive" className="max-w-md">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>Convex Configuration Error</AlertTitle>
          <AlertDescription>
            {error}
            <div className="mt-2 text-sm">
              If running locally, make sure to run <code className="bg-muted p-1 rounded">convex dev</code> and ensure
              the <code className="bg-muted p-1 rounded">.env.local</code> file is populated.
            </div>
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  if (!client) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return <ConvexReactProvider client={client}>{children}</ConvexReactProvider>
}

