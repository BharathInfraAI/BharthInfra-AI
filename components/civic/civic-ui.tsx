import type { ReactNode } from "react";

export function GlassCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`rounded-2xl border border-white/70 bg-white/65 shadow-[0_18px_45px_rgba(68,100,150,0.12)] backdrop-blur ${className}`}>{children}</section>;
}

export function CivicPageHeader({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: string }) {
  return <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-600">{eyebrow}</p><h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{title}</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">{description}</p></div>{action ? <button className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-500" type="button">{action}</button> : null}</div>;
}

export function Metric({ label, value, detail, tone = "blue" }: { label: string; value: string; detail: string; tone?: "blue" | "teal" | "amber" | "rose" }) {
  const accent = { blue: "text-blue-400", teal: "text-teal-400", amber: "text-amber-400", rose: "text-rose-400" }[tone];
  return <GlassCard className="p-5"><p className="text-sm text-slate-500">{label}</p><p className={`mt-2 text-3xl font-bold ${accent}`}>{value}</p><p className="mt-3 text-xs text-slate-500">{detail}</p></GlassCard>;
}

export function DemoNote() { return <p className="rounded-lg border border-teal-500/15 bg-teal-500/5 px-3 py-2 text-xs text-teal-700">Demo data only. This view is not connected to live government records.</p>; }
