export const authorityStats = [
  { label: "Active projects", value: "248", helper: "12 added this quarter", tone: "blue" as const },
  { label: "Projects on track", value: "186", helper: "75% of active portfolio", tone: "emerald" as const },
  { label: "High-risk projects", value: "31", helper: "6 require review today", tone: "rose" as const },
  { label: "Open complaints", value: "47", helper: "14 awaiting assignment", tone: "amber" as const },
];

export const priorityProjects = [
  { id: "NHAI-204", name: "NH-44 Corridor Upgrade", region: "Tamil Nadu", progress: 58, status: "At risk" as const, risk: "High" as const, variance: "-14% vs plan" },
  { id: "KA-MET-118", name: "Bengaluru Metro Phase II", region: "Karnataka", progress: 72, status: "On track" as const, risk: "Low" as const, variance: "+3% vs plan" },
  { id: "OD-WTR-091", name: "Coastal Water Supply Scheme", region: "Odisha", progress: 41, status: "Delayed" as const, risk: "High" as const, variance: "-18% vs plan" },
  { id: "RJ-RD-305", name: "Rural Roads Package 7", region: "Rajasthan", progress: 64, status: "At risk" as const, risk: "Medium" as const, variance: "-6% vs plan" },
];

export const dashboardAlerts = [
  { title: "Progress mismatch detected", project: "NH-44 Corridor Upgrade", detail: "Reported progress is 14 percentage points above verified progress.", tone: "rose" as const },
  { title: "Complaint cluster requires review", project: "Rural Roads Package 7", detail: "Nine road-damage reports were received in the last seven days.", tone: "amber" as const },
  { title: "Milestone verification ready", project: "Bengaluru Metro Phase II", detail: "New site imagery is available for the August milestone.", tone: "blue" as const },
];
