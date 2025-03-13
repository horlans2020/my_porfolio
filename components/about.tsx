"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Skeleton } from "@/components/ui/skeleton"

// Fallback profile data when Convex is not configured
const fallbackProfile = {
  _id: "fallback",
  _creationTime: Date.now(),
  name: "Alex Johnson",
  title: "Full-Stack Developer",
  bio: "I'm a full-stack developer with over 5 years of experience building web applications. I specialize in creating responsive, user-friendly interfaces with modern JavaScript frameworks and robust backend systems. My approach combines technical expertise with a keen eye for design, ensuring that the applications I build are not only functional but also visually appealing and intuitive to use.",
  image: "/placeholder.svg?height=400&width=400",
  skills: [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Express",
    "MongoDB",
    "PostgreSQL",
    "Tailwind CSS",
    "GraphQL",
    "AWS",
    "Docker",
  ],
  email: "alex@example.com",
  phone: "+1 (234) 567-890",
  location: "San Francisco, California",
}

export function About() {
  // Try to get profile from Convex, but handle the case when it's not available
  const profileQuery = useQuery(api.profile.get)

  // Use fallback data if Convex query returns null (which happens when Convex is not configured)
  const profile = profileQuery === null ? fallbackProfile : profileQuery

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-2">About Me</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </motion.div>

        {profile === undefined ? (
          // Loading state
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-square max-w-md mx-auto md:mx-0">
              <Skeleton className="w-full h-full rounded-lg" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-8 w-1/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-8 w-1/3 mt-6" />
              <div className="flex flex-wrap gap-2 mt-2">
                {Array(8)
                  .fill(0)
                  .map((_, i) => (
                    <Skeleton key={i} className="h-6 w-20 rounded-full" />
                  ))}
              </div>
            </div>
          </div>
        ) : profile ? (
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative aspect-square max-w-md mx-auto md:mx-0 overflow-hidden rounded-lg"
            >
              <Image
                src={profile.image || "/placeholder.svg?height=400&width=400"}
                alt={profile.name}
                width={400}
                height={400}
                className="object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="text-2xl font-bold mb-4">Who I Am</h3>
              <p className="text-muted-foreground mb-6">{profile.bio}</p>

              <h3 className="text-xl font-bold mb-4">My Skills</h3>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </motion.div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p>No profile information available yet.</p>
          </div>
        )}
      </div>
    </section>
  )
}

