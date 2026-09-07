"use client";

import { AlertTriangle, BarChart3, BrainCircuit, FolderKanban, LayoutDashboard, MessageSquareWarning, Satellite, UsersRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationItems = [
  { href: "/dashboard", label: "Command Center", icon: LayoutDashboard },
  { href: "/dashboard/projects", label: "Project Intelligence", icon: FolderKanban },
  { href: "/dashboard/prediction", label: "AI Risk & Forecast", icon: BrainCircuit },
  { href: "/dashboard/verification", label: "Progress Verification", icon: BarChart3 },
  { href: "/dashboard/satellite", label: "Geo & Satellite Intelligence", icon: Satellite },
  { href: "/dashboard/contractors", label: "Contractor Intelligence", icon: UsersRound },
  { href: "/dashboard/alerts", label: "Early Warning Center", icon: AlertTriangle },
  { href: "/dashboard/complaints", label: "Citizen Pulse", icon: MessageSquareWarning },
];

export function AuthorityNavigation({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return <nav aria-label="Authority navigation" className="space-y-1 px-3"><p className="mb-3 px-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Monitoring workspace</p>{navigationItems.map((item) => { const Icon = item.icon; const isActive = pathname === item.href; return <Link className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${isActive ? "bg-blue-600 text-white shadow-sm shadow-blue-950/30" : "text-slate-300 hover:bg-slate-800 hover:text-white"}`} href={item.href} key={item.href} onClick={onNavigate}><Icon aria-hidden="true" className="size-[18px]" /><span>{item.label}</span></Link>; })}</nav>;
}
