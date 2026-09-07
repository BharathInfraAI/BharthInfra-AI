import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    name: v.string(),
    email: v.optional(v.string()),
    role: v.union(v.literal("authority"), v.literal("engineer"), v.literal("citizen")),
    createdAt: v.number(),
  }).index("by_clerk_id", ["clerkId"]),
});
