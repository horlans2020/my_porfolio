import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  handler: async (ctx) => {
    const profiles = await ctx.db.query("profile").collect();
    return profiles.length > 0 ? profiles[0] : null;
  },
});

export const upsert = mutation({
  args: {
    name: v.string(),
    title: v.string(),
    bio: v.string(),
    image: v.optional(v.string()),
    skills: v.array(v.string()),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    location: v.optional(v.string()),
    socialLinks: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const profiles = await ctx.db.query("profile").collect();

    if (profiles.length > 0) {
      return await ctx.db.patch(profiles[0]._id, args);
    } else {
      return await ctx.db.insert("profile", args);
    }
  },
});
