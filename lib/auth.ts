import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export type AppRole = "authority" | "engineer" | "citizen";
export async function getCurrentUserRole(): Promise<AppRole | null> { const user = await currentUser(); const role = user?.publicMetadata.role; return role === "authority" || role === "engineer" || role === "citizen" ? role : "citizen"; }
export async function requireRole(role: AppRole) { const { userId } = await auth(); if (!userId) redirect("/sign-in"); const current = await getCurrentUserRole(); if (current !== role) redirect("/unauthorized"); }
