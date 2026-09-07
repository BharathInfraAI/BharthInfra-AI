import { AuthorityDashboardShell } from "@/components/authority/authority-dashboard-shell";
import { requireRole } from "@/lib/auth";
import { ConvexAuthStatus } from "@/components/auth/convex-auth-status";

export default async function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  await requireRole("authority");
  return <AuthorityDashboardShell><div className="space-y-4"><ConvexAuthStatus />{children}</div></AuthorityDashboardShell>;
}
