"use client"

import { motion } from "framer-motion"
import { ProjectCard } from "./project-card"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Skeleton } from "@/components/ui/skeleton"
import { ConvexFallback } from "./convex-fallback"

// Fallback data when Convex is not configured
const fallbackProjects = [
  {
    _id: "fallback1",
    _creationTime: Date.now(),
    title: "E-commerce Platform",
    description: "A full-featured online store with payment processing, inventory management, and admin dashboard.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    demoUrl: "#",
    codeUrl: "#",
    featured: true,
    order: 1,
    createdAt: Date.now(),
  },
  {
    _id: "fallback2",
    _creationTime: Date.now(),
    title: "Task Management App",
    description: "A collaborative task management tool with real-time updates, file sharing, and team communication.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Next.js", "Firebase", "Tailwind CSS", "Redux"],
    demoUrl: "#",
    codeUrl: "#",
    featured: true,
    order: 2,
    createdAt: Date.now() - 100000,
  },
  {
    _id: "fallback3",
    _creationTime: Date.now(),
    title: "Fitness Tracker",
    description: "A mobile-responsive application for tracking workouts, nutrition, and fitness goals.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["React Native", "GraphQL", "PostgreSQL", "Chart.js"],
    demoUrl: "#",
    codeUrl: "#",
    featured: false,
    order: 3,
    createdAt: Date.now() - 200000,
  },
  {
    _id: "fallback4",
    _creationTime: Date.now(),
    title: "Weather Dashboard",
    description: "A weather forecasting application with location-based services and interactive maps.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["JavaScript", "OpenWeather API", "Mapbox", "CSS3"],
    demoUrl: "#",
    codeUrl: "#",
    featured: false,
    order: 4,
    createdAt: Date.now() - 300000,
  },
]

export function Projects() {
  // Try to get projects from Convex, but handle the case when it's not available
  const projectsQuery = useQuery(api.projects.getAll)

  // Use fallback data if Convex query returns null (which happens when Convex is not configured)
  const projects = projectsQuery === null ? fallbackProjects : projectsQuery

  // If we're showing fallback data and Convex is not configured, show the fallback notice
  const showFallbackNotice = projectsQuery === null

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        {showFallbackNotice && <ConvexFallback />}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-2">My Projects</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Here are some of my recent projects. Each one presented unique challenges and opportunities to learn and
            grow as a developer.
          </p>
        </motion.div>

        {projects === undefined ? (
          // Loading state
          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col space-y-3">
                <Skeleton className="h-60 w-full rounded-lg" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <div className="flex gap-2 mt-2">
                  {[1, 2, 3].map((j) => (
                    <Skeleton key={j} className="h-5 w-16 rounded-full" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

