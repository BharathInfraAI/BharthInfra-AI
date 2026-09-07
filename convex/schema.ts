import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Users and roles
  users: defineTable({
    clerkId: v.string(),
    name: v.string(),
    email: v.optional(v.string()),
    role: v.union(
      v.literal("authority"),
      v.literal("engineer"),
      v.literal("citizen")
    ),
    createdAt: v.number(),
  }).index("by_clerk_id", ["clerkId"]),

  // Government infrastructure projects
  projects: defineTable({
    name: v.string(),
    type: v.string(),
    projectCode: v.string(),
    description: v.optional(v.string()),

    // Location
    state: v.string(),
    district: v.string(),
    city: v.string(),
    latitude: v.number(),
    longitude: v.number(),

    // Financial information
    approvedBudget: v.number(),
    tenderAmount: v.number(),
    currentExpenditure: v.number(),

    // Timeline
    startDate: v.string(),
    expectedCompletionDate: v.string(),

    // Contractor
    contractorName: v.string(),

    // Progress
    reportedProgress: v.number(),

    status: v.union(
      v.literal("planned"),
      v.literal("ongoing"),
      v.literal("delayed"),
      v.literal("completed"),
      v.literal("on_hold")
    ),

    // Ownership / timestamps
    createdBy: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_project_code", ["projectCode"])
    .index("by_status", ["status"])
    .index("by_state", ["state"]),
});