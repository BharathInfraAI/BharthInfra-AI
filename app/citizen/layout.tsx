import { requireRole } from "@/lib/auth";
export default async function Layout({ children }: { children: React.ReactNode }) { await requireRole("citizen"); return children; }
