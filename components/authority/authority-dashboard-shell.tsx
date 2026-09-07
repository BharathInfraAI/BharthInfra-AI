"use client";

import { useState, type ReactNode } from "react";
import { AuthorityHeader } from "./authority-header";
import { AuthoritySidebar } from "./authority-sidebar";

export function AuthorityDashboardShell({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return <div className="min-h-screen bg-[#eef4fc] text-slate-900"><AuthoritySidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} /><div className="min-h-screen lg:pl-72"><AuthorityHeader onOpenSidebar={() => setIsSidebarOpen(true)} /><main className="p-4 sm:p-6 lg:p-8">{children}</main></div></div>;
}
