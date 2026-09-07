"use client";

import { useAuth, useClerk } from "@clerk/nextjs";

export function AuthorityLoginButton() {
  const { isSignedIn } = useAuth();
  const { signOut } = useClerk();

  async function handleLogin() {
    if (isSignedIn) {
      await signOut({ redirectUrl: "/sign-in" });
      return;
    }
    window.location.assign("/sign-in");
  }

  return (
    <button
      className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-950 hover:bg-slate-200"
      onClick={handleLogin}
      type="button"
    >
      Authority Login
    </button>
  );
}
