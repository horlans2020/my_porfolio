import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  projects: defineTable({
    title: v.string(),
    description: v.string(),
    image: v.string(),
    tags: v.array(v.string()),
    demoUrl: v.string(),
    codeUrl: v.string(),
    featured: v.optional(v.boolean()),
    order: v.optional(v.number()),
    createdAt: v.number(),
  }).index("by_creation_at", ["createdAt"]),

  messages: defineTable({
    name: v.string(),
    email: v.string(),
    subject: v.string(),
    message: v.string(),
    read: v.optional(v.boolean()),
    createdAt: v.number(),
  }).index("by_creation_at", ["createdAt"]),

  profile: defineTable({
    name: v.string(),
    title: v.string(),
    bio: v.string(),
    image: v.optional(v.string()),
    skills: v.array(v.string()),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    location: v.optional(v.string()),
    socialLinks: v.optional(v.array(v.object({}))),
  }).index("by_name", ["name"]),
});
