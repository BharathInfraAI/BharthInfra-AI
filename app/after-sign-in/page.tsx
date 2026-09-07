import { auth } from "@clerk/nextjs/server";
import { getCurrentUserRole } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AfterSignInPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");
  const role = await getCurrentUserRole();
  redirect(role === "authority" ? "/dashboard" : role === "engineer" ? "/engineer" : "/citizen");
}
