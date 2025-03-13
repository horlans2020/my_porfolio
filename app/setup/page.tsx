import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SetupPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Convex Setup Guide</h1>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Step 1: Create a Convex Account</CardTitle>
              <CardDescription>Set up your Convex project</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                1. Go to{" "}
                <a
                  href="https://dashboard.convex.dev"
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Convex Dashboard
                </a>{" "}
                and sign up for an account.
              </p>
              <p>2. Create a new project and name it (e.g., "portfolio").</p>
              <p>
                3. Once created, you'll get a deployment URL that looks like:{" "}
                <code className="bg-muted p-1 rounded">https://eager-animal-123.convex.cloud</code>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Step 2: Set Environment Variables</CardTitle>
              <CardDescription>Configure your Next.js app to connect to Convex</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Create a <code className="bg-muted p-1 rounded">.env.local</code> file in your project root with the
                following:
              </p>
              <pre className="bg-muted p-4 rounded overflow-x-auto">
                {`NEXT_PUBLIC_CONVEX_URL=your_convex_deployment_url`}
              </pre>
              <p>
                Replace <code className="bg-muted p-1 rounded">your_convex_deployment_url</code> with the URL from Step
                1.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Step 3: Install Convex CLI</CardTitle>
              <CardDescription>Set up the Convex CLI for development</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Install the Convex CLI globally:</p>
              <pre className="bg-muted p-4 rounded overflow-x-auto">{`npm install -g convex`}</pre>
              <p>Then, initialize Convex in your project:</p>
              <pre className="bg-muted p-4 rounded overflow-x-auto">{`npx convex dev`}</pre>
              <p>This will start the Convex development server and sync your schema with your Convex project.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Step 4: Seed Your Database</CardTitle>
              <CardDescription>Populate your database with initial data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Visit the admin page at <code className="bg-muted p-1 rounded">/admin</code> and click "Seed Database"
                to populate your Convex database with sample projects and profile data.
              </p>
              <p>
                You can then customize this data through the Convex Dashboard or by creating admin interfaces in your
                application.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Step 5: Customize Your Data</CardTitle>
              <CardDescription>Make the portfolio your own</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>After seeding, you can modify the data through the Convex Dashboard:</p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Go to your Convex Dashboard</li>
                <li>Select your project</li>
                <li>Navigate to the "Data" tab</li>
                <li>Edit the "projects" and "profile" tables to customize your portfolio content</li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

