"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Skeleton } from "@/components/ui/skeleton";

// Fallback profile data when Convex is not configured
const fallbackProfile = {
  _id: "fallback",
  _creationTime: Date.now(),
  name: "Olarewaju samuel",
  title: "A passionate full-stack developer creating beautiful and functional web experiences",
};

export function Hero() {
  // Try to get profile from Convex, but handle the case when it's not available
  const profileQuery = useQuery(api.profile.get);

  // Use fallback data if Convex query returns null (which happens when Convex is not configured)
  const profile = profileQuery === null ? fallbackProfile : profileQuery;

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background z-10" />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] z-0" />
      </div>

      <div className="container mx-auto px-4 z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center max-w-3xl mx-auto">
          {profile === undefined ? (
            <div className="space-y-6 flex flex-col items-center">
              <Skeleton className="h-12 w-2/3" />
              <Skeleton className="h-6 w-full" />
              <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-10 w-32" />
              </div>
            </div>
          ) : profile ? (
            <>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Hi, I'm <span className="text-primary">{profile.name.split(" ")[0]}</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8">{profile.title}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" onClick={scrollToProjects}>
                  View My Work
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="#contact">Get In Touch</a>
                </Button>
              </div>
            </>
          ) : (
            <p>Loading profile information...</p>
          )}
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}>
          <Button variant="ghost" size="icon" asChild>
            <a href="#about">
              <ArrowDown className="h-6 w-6" />
              <span className="sr-only">Scroll down</span>
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
