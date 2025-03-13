"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import { isConvexConfigured } from "@/lib/convex-utils"

export default function AdminPage() {
  const seedDatabase = useMutation(api.seed.seed)
  const { toast } = useToast()
  const [isSeeding, setIsSeeding] = useState(false)
  const [convexAvailable, setConvexAvailable] = useState(false)

  useEffect(() => {
    setConvexAvailable(isConvexConfigured())
  }, [])

  const handleSeed = async () => {
    setIsSeeding(true)
    try {
      await seedDatabase()
      toast({
        title: "Success",
        description: "Database seeded successfully!",
      })
    } catch (error) {
      console.error("Error seeding database:", error)
      toast({
        title: "Error",
        description: "Failed to seed database. Check console for details.",
        variant: "destructive",
      })
    } finally {
      setIsSeeding(false)
    }
  }

  if (!convexAvailable) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-md mx-auto">
          <Alert variant="destructive">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>Convex Not Configured</AlertTitle>
            <AlertDescription>
              <p className="mb-4">You need to configure Convex before you can use the admin features.</p>
              <p className="mb-4">Please follow the setup instructions to connect your portfolio to Convex:</p>
              <ol className="list-decimal pl-5 space-y-2 mb-4">
                <li>
                  Create a Convex account at{" "}
                  <a
                    href="https://dashboard.convex.dev"
                    className="text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    dashboard.convex.dev
                  </a>
                </li>
                <li>Create a new project and get your deployment URL</li>
                <li>
                  Add the URL to your environment variables as{" "}
                  <code className="bg-muted p-1 rounded">NEXT_PUBLIC_CONVEX_URL</code>
                </li>
                <li>
                  Run <code className="bg-muted p-1 rounded">npx convex dev</code> to start the Convex development
                  server
                </li>
              </ol>
              <Button asChild className="w-full">
                <a href="/setup">View Setup Guide</a>
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Admin Dashboard</CardTitle>
            <CardDescription>Manage your portfolio data</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Use this page to initialize your portfolio with sample data. This will create projects and profile
              information in your Convex database.
            </p>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSeed} disabled={isSeeding} className="w-full">
              {isSeeding ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Seeding Database...
                </>
              ) : (
                "Seed Database"
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

