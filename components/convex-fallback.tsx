import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function ConvexFallback() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <Alert className="mb-6">
        <AlertTitle className="text-xl font-bold">Convex Not Configured</AlertTitle>
        <AlertDescription>
          <p className="mb-4">
            Your portfolio is running without a Convex backend. The site will display sample data instead of real data
            from a database.
          </p>
          <p className="mb-4">To set up Convex and enable dynamic content and the contact form:</p>
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
              Run <code className="bg-muted p-1 rounded">npx convex dev</code> to start the Convex development server
            </li>
          </ol>
          <div className="flex gap-4 mt-4">
            <Button asChild>
              <Link href="/setup">View Setup Guide</Link>
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  )
}

