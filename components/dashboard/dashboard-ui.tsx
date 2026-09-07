import type { LucideIcon } from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

type Tone = "blue" | "emerald" | "amber" | "rose" | "slate";

const toneClasses: Record<Tone, string> = {
  blue: "bg-blue-50 text-blue-700 ring-blue-100",
  emerald: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  amber: "bg-amber-50 text-amber-700 ring-amber-100",
  rose: "bg-rose-50 text-rose-700 ring-rose-100",
  slate: "bg-slate-100 text-slate-700 ring-slate-200",
};

export function SectionCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`rounded-2xl border border-slate-200 bg-white shadow-sm ${className}`}>{children}</section>;
}

export function StatCard({ label, value, helper, icon: Icon, tone }: { label: string; value: string; helper: string; icon: LucideIcon; tone: Tone }) {
  return <SectionCard className="p-5"><div className="flex items-start justify-between gap-4"><div><p className="text-sm font-medium text-slate-500">{label}</p><p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">{value}</p></div><span className={`grid size-11 place-items-center rounded-xl ring-1 ${toneClasses[tone]}`}><Icon aria-hidden="true" className="size-5" /></span></div><p className="mt-4 text-xs font-medium text-slate-500">{helper}</p></SectionCard>;
}

export function RiskBadge({ risk }: { risk: "High" | "Medium" | "Low" }) {
  const tone: Record<typeof risk, Tone> = { High: "rose", Medium: "amber", Low: "emerald" };
  return <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${toneClasses[tone[risk]]}`}>{risk} risk</span>;
}

export function StatusBadge({ status }: { status: "On track" | "At risk" | "Delayed" }) {
  const tone: Record<typeof status, Tone> = { "On track": "emerald", "At risk": "amber", Delayed: "rose" };
  return <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${toneClasses[tone[status]]}`}>{status}</span>;
}

export function ProgressBar({ value }: { value: number }) {
  return <div aria-label={`${value}% completed`} aria-valuemax={100} aria-valuemin={0} aria-valuenow={value} className="h-2 w-full overflow-hidden rounded-full bg-slate-100" role="progressbar"><div className="h-full rounded-full bg-blue-600" style={{ width: `${value}%` }} /></div>;
}

export function SectionHeading({ title, action }: { title: string; action?: string }) {
  return <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-5 py-4"><h2 className="text-base font-bold text-slate-900">{title}</h2>{action ? <button className="inline-flex items-center gap-1 text-sm font-semibold text-blue-700 hover:text-blue-800" type="button">{action}<ArrowUpRight aria-hidden="true" className="size-4" /></button> : null}</div>;
}
