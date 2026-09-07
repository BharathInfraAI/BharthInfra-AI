import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getCurrentUser = query({
  args: {},
  returns: v.any(),
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;
    return await ctx.db.query("users").withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject)).unique();
  },
});

export const ensureCurrentUser = mutation({
  args: {},
  returns: v.id("users"),
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Authentication required");
    const existing = await ctx.db.query("users").withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject)).unique();
    if (existing) return existing._id;
    return await ctx.db.insert("users", { clerkId: identity.subject, name: identity.name ?? "Citizen", email: identity.email, role: "citizen", createdAt: Date.now() });
  },
});
