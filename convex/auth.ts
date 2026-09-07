import type { QueryCtx, MutationCtx } from "./_generated/server";

type AuthContext = QueryCtx | MutationCtx;
export async function requireAuthenticatedUser(ctx: AuthContext) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) throw new Error("Authentication required");
  const user = await ctx.db.query("users").withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject)).unique();
  if (!user) throw new Error("User record not initialized");
  return user;
}
export async function requireRole(ctx: AuthContext, role: "authority" | "engineer" | "citizen") {
  const user = await requireAuthenticatedUser(ctx);
  if (user.role !== role) throw new Error("Forbidden");
  return user;
}
