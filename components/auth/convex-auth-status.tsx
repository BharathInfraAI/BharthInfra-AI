"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
import { useConvexAuth, useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export function ConvexAuthStatus() {
  const { isLoaded, isSignedIn, userId } = useAuth();
  const { isAuthenticated: isConvexAuthenticated, isLoading: isConvexLoading } = useConvexAuth();
  const applicationUser = useQuery(api.users.getCurrentUser, isConvexAuthenticated ? {} : "skip");
  const ensureCurrentUser = useMutation(api.users.ensureCurrentUser);
  useEffect(() => { if (isConvexAuthenticated && applicationUser === null) void ensureCurrentUser(); }, [applicationUser, ensureCurrentUser, isConvexAuthenticated]);
  const state = !isLoaded ? "Resolving Clerk session" : !isSignedIn ? "Not authenticated" : isConvexLoading || !isConvexAuthenticated ? "Authenticating with Convex" : applicationUser === undefined ? "Loading application user" : applicationUser === null ? "Creating application user" : "Convex authenticated";
  return <aside className="rounded-xl border border-blue-100 bg-blue-50/80 px-4 py-3 text-xs text-slate-600"><p className="font-semibold text-blue-800">Authentication check: {state}</p>{userId ? <p className="mt-1 break-all">Clerk ID: {userId}{applicationUser ? ` · Role: ${applicationUser.role}` : ""}</p> : null}</aside>;
}
