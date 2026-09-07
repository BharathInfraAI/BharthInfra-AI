import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

async function requireAuthority(ctx: any) {
  const identity = await ctx.auth.getUserIdentity();

  if (!identity) {
    throw new Error("Authentication required");
  }

  const user = await ctx.db
    .query("users")
    .withIndex("by_clerk_id", (q: any) =>
      q.eq("clerkId", identity.subject)
    )
    .unique();

  if (!user || user.role !== "authority") {
    throw new Error("Authority access required");
  }

  return user;
}

// Get all projects
export const list = query({
  args: {},
  returns: v.array(v.any()),

  handler: async (ctx) => {
    await requireAuthority(ctx);

    return await ctx.db
      .query("projects")
      .order("desc")
      .collect();
  },
});

// Get one project
export const getById = query({
  args: {
    id: v.id("projects"),
  },
  returns: v.any(),

  handler: async (ctx, args) => {
    await requireAuthority(ctx);

    return await ctx.db.get(args.id);
  },
});

// Create a project
export const create = mutation({
  args: {
    name: v.string(),
    type: v.string(),
    projectCode: v.string(),
    description: v.optional(v.string()),

    state: v.string(),
    district: v.string(),
    city: v.string(),
    latitude: v.number(),
    longitude: v.number(),

    approvedBudget: v.number(),
    tenderAmount: v.number(),
    currentExpenditure: v.number(),

    startDate: v.string(),
    expectedCompletionDate: v.string(),

    contractorName: v.string(),

    reportedProgress: v.number(),

    status: v.union(
      v.literal("planned"),
      v.literal("ongoing"),
      v.literal("delayed"),
      v.literal("completed"),
      v.literal("on_hold")
    ),
  },

  returns: v.id("projects"),

  handler: async (ctx, args) => {
    const user = await requireAuthority(ctx);

    const existingProject = await ctx.db
      .query("projects")
      .withIndex("by_project_code", (q) =>
        q.eq("projectCode", args.projectCode)
      )
      .unique();

    if (existingProject) {
      throw new Error(
        `Project code "${args.projectCode}" already exists`
      );
    }

    const now = Date.now();

    return await ctx.db.insert("projects", {
      ...args,
      createdBy: user.clerkId,
      createdAt: now,
      updatedAt: now,
    });
  },
});

// Update a project
export const update = mutation({
  args: {
    id: v.id("projects"),

    name: v.optional(v.string()),
    type: v.optional(v.string()),
    description: v.optional(v.string()),

    state: v.optional(v.string()),
    district: v.optional(v.string()),
    city: v.optional(v.string()),
    latitude: v.optional(v.number()),
    longitude: v.optional(v.number()),

    approvedBudget: v.optional(v.number()),
    tenderAmount: v.optional(v.number()),
    currentExpenditure: v.optional(v.number()),

    startDate: v.optional(v.string()),
    expectedCompletionDate: v.optional(v.string()),

    contractorName: v.optional(v.string()),
    reportedProgress: v.optional(v.number()),

    status: v.optional(
      v.union(
        v.literal("planned"),
        v.literal("ongoing"),
        v.literal("delayed"),
        v.literal("completed"),
        v.literal("on_hold")
      )
    ),
  },

  returns: v.null(),

  handler: async (ctx, args) => {
    await requireAuthority(ctx);

    const { id, ...updates } = args;

    const project = await ctx.db.get(id);

    if (!project) {
      throw new Error("Project not found");
    }

    await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    });

    return null;
  },
});