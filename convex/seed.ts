import { mutation } from "./_generated/server";

export const seed = mutation({
  handler: async (ctx) => {
    // Check if we already have data
    const existingProjects = await ctx.db.query("projects").collect();
    const existingProfile = await ctx.db.query("profile").first();

    if (existingProjects.length === 0) {
      // Seed projects
      await ctx.db.insert("projects", {
        title: "E-commerce Platform",
        description: "A full-featured online store with payment processing, inventory management, and admin dashboard.",
        image: "/placeholder.svg?height=600&width=800",
        tags: ["React", "Node.js", "MongoDB", "Stripe"],
        demoUrl: "https://example.com/demo",
        codeUrl: "https://github.com/example/ecommerce",
        featured: true,
        order: 1,
        createdAt: Date.now(),
      });

      await ctx.db.insert("projects", {
        title: "Task Management App",
        description: "A collaborative task management tool with real-time updates, file sharing, and team communication.",
        image: "/placeholder.svg?height=600&width=800",
        tags: ["Next.js", "Firebase", "Tailwind CSS", "Redux"],
        demoUrl: "https://example.com/demo",
        codeUrl: "https://github.com/example/taskmanager",
        featured: true,
        order: 2,
        createdAt: Date.now() - 100000,
      });

      await ctx.db.insert("projects", {
        title: "Fitness Tracker",
        description: "A mobile-responsive application for tracking workouts, nutrition, and fitness goals.",
        image: "/placeholder.svg?height=600&width=800",
        tags: ["React Native", "GraphQL", "PostgreSQL", "Chart.js"],
        demoUrl: "https://example.com/demo",
        codeUrl: "https://github.com/example/fitness",
        featured: false,
        order: 3,
        createdAt: Date.now() - 200000,
      });

      await ctx.db.insert("projects", {
        title: "Weather Dashboard",
        description: "A weather forecasting application with location-based services and interactive maps.",
        image: "/placeholder.svg?height=600&width=800",
        tags: ["JavaScript", "OpenWeather API", "Mapbox", "CSS3"],
        demoUrl: "https://example.com/demo",
        codeUrl: "https://github.com/example/weather",
        featured: false,
        order: 4,
        createdAt: Date.now() - 300000,
      });
    }

    if (!existingProfile) {
      // Seed profile
      await ctx.db.insert("profile", {
        name: "Olarewaju Samuel",
        title: "Full-Stack Developer",
        bio: "I'm a full-stack developer with over 5 years of experience building web applications. I specialize in creating responsive, user-friendly interfaces with modern JavaScript frameworks and robust backend systems. My approach combines technical expertise with a keen eye for design, ensuring that the applications I build are not only functional but also visually appealing and intuitive to use.",
        image: "/placeholder.svg?height=400&width=400",
        skills: ["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Express", "MongoDB", "PostgreSQL", "Tailwind CSS", "Python", "Django", "FastAPI", "AWS"],
        email: "alex@example.com",
        phone: "+1 (234) 567-890",
        location: "San Francisco, California",
        // socialLinks: [{ github: "https://github.com/alexjohnson" }, { linkedin: "https://linkedin.com/in/alexjohnson" }, { twitter: "https://twitter.com/alexjohnson" }],
      });
    }

    return {
      success: true,
      message: "Database seeded successfully!",
    };
  },
});
