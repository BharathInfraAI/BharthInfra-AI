"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import {
  Building2,
  CalendarDays,
  CheckCircle2,
  IndianRupee,
  MapPin,
  Plus,
  X,
} from "lucide-react";

import { api } from "@/convex/_generated/api";
import { CivicPageHeader, DemoNote, GlassCard, Metric } from "./civic-ui";

const initialForm = {
  name: "",
  type: "",
  projectCode: "",
  description: "",
  state: "",
  district: "",
  city: "",
  latitude: "",
  longitude: "",
  approvedBudget: "",
  tenderAmount: "",
  currentExpenditure: "",
  startDate: "",
  expectedCompletionDate: "",
  contractorName: "",
  reportedProgress: "0",
  status: "planned" as
    | "planned"
    | "ongoing"
    | "delayed"
    | "completed"
    | "on_hold",
};

export function ProjectIntelligence() {
  const projects = useQuery(api.projects.list);
  const createProject = useMutation(api.projects.create);

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const updateField = (field: keyof typeof initialForm, value: string) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (
      !form.name ||
      !form.type ||
      !form.projectCode ||
      !form.state ||
      !form.district ||
      !form.city ||
      !form.latitude ||
      !form.longitude ||
      !form.approvedBudget ||
      !form.tenderAmount ||
      !form.startDate ||
      !form.expectedCompletionDate ||
      !form.contractorName
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    const progress = Number(form.reportedProgress);

    if (progress < 0 || progress > 100) {
      setError("Reported progress must be between 0 and 100.");
      return;
    }

    try {
      setSaving(true);

      await createProject({
        name: form.name,
        type: form.type,
        projectCode: form.projectCode,
        description: form.description || undefined,

        state: form.state,
        district: form.district,
        city: form.city,
        latitude: Number(form.latitude),
        longitude: Number(form.longitude),

        approvedBudget: Number(form.approvedBudget),
        tenderAmount: Number(form.tenderAmount),
        currentExpenditure: Number(form.currentExpenditure || 0),

        startDate: form.startDate,
        expectedCompletionDate: form.expectedCompletionDate,

        contractorName: form.contractorName,

        reportedProgress: progress,

        status: form.status,
      });

      setForm(initialForm);
      setShowForm(false);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to create project."
      );
    } finally {
      setSaving(false);
    }
  };

  const activeProjects =
    projects?.filter(
      (project) =>
        project.status !== "completed" && project.status !== "on_hold"
    ).length ?? 0;

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <CivicPageHeader
        action="+ Add New Project"
        description="Monitor delivery milestones, verified progress, and exceptions across the active infrastructure portfolio."
        eyebrow="Projects"
        title="Project Intelligence"
        onAction={() => {
          setError("");
          setShowForm(true);
        }}
      />

      <DemoNote />

      <div className="grid gap-4 md:grid-cols-3">
        <Metric
          detail={`${projects?.length ?? 0} projects in Convex`}
          label="Total projects"
          tone="blue"
          value={projects ? String(projects.length) : "—"}
        />

        <Metric
          detail="Currently active"
          label="Active projects"
          tone="blue"
          value={projects ? String(activeProjects) : "—"}
        />

        <GlassCard className="p-5">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-teal-400/10 text-teal-300">
              <CheckCircle2 className="size-5" />
            </span>

            <div>
              <p className="text-xs text-slate-500">Database status</p>
              <p className="mt-1 font-semibold text-white">
                {projects === undefined ? "Loading..." : "Connected"}
              </p>
            </div>
          </div>
        </GlassCard>
      </div>

      <GlassCard className="overflow-hidden">
        <div className="border-b border-white/10 px-5 py-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="font-semibold text-white">
                Infrastructure projects
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Live project records from the shared Convex database.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setError("");
                setShowForm(true);
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-400"
            >
              <Plus className="size-4" />
              Add project
            </button>
          </div>
        </div>

        {projects === undefined ? (
          <div className="px-5 py-12 text-center text-sm text-slate-500">
            Loading projects...
          </div>
        ) : projects.length === 0 ? (
          <div className="px-5 py-14 text-center">
            <Building2 className="mx-auto size-10 text-slate-600" />
            <h3 className="mt-4 font-semibold text-white">
              No projects yet
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Add your first infrastructure project to start building the
              shared project intelligence layer.
            </p>

            <button
              type="button"
              onClick={() => {
                setError("");
                setShowForm(true);
              }}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-400"
            >
              <Plus className="size-4" />
              Add New Project
            </button>
          </div>
        ) : (
          <div className="divide-y divide-white/10">
            {projects.map((project) => (
              <div
                key={project._id}
                className="flex flex-col gap-4 px-5 py-5 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-slate-100">
                      {project.name}
                    </h3>

                    <span className="rounded-full bg-blue-400/10 px-2.5 py-1 text-xs font-semibold text-blue-300">
                      {project.projectCode}
                    </span>
                  </div>

                  <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="size-3.5" />
                      {project.city}, {project.state}
                    </span>

                    <span className="inline-flex items-center gap-1.5">
                      <Building2 className="size-3.5" />
                      {project.type}
                    </span>

                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="size-3.5" />
                      {project.expectedCompletionDate}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-xs text-slate-500">Reported progress</p>
                    <p className="mt-1 text-lg font-semibold text-teal-300">
                      {project.reportedProgress}%
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                      project.status === "delayed"
                        ? "bg-rose-400/10 text-rose-300"
                        : project.status === "completed"
                          ? "bg-emerald-400/10 text-emerald-300"
                          : "bg-blue-400/10 text-blue-300"
                    }`}
                  >
                    {project.status.replace("_", " ")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </GlassCard>

      {showForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 p-4 backdrop-blur-sm">
          <div className="mx-auto my-8 max-w-4xl">
            <GlassCard className="overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-300">
                    Project Intelligence
                  </p>
                  <h2 className="mt-1 text-xl font-semibold text-white">
                    Add New Project
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white"
                >
                  <X className="size-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 p-6">
                {error && (
                  <div className="rounded-xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-300">
                    {error}
                  </div>
                )}

                <FormSection title="Project details">
                  <Field
                    label="Project Name *"
                    value={form.name}
                    onChange={(value) => updateField("name", value)}
                    placeholder="NH-44 Highway Expansion"
                  />

                  <Field
                    label="Project Type *"
                    value={form.type}
                    onChange={(value) => updateField("type", value)}
                    placeholder="Highway"
                  />

                  <Field
                    label="Project ID / Code *"
                    value={form.projectCode}
                    onChange={(value) => updateField("projectCode", value)}
                    placeholder="NH44-2026-001"
                  />

                  <Field
                    label="Description"
                    value={form.description}
                    onChange={(value) => updateField("description", value)}
                    placeholder="Brief project description"
                    wide
                  />
                </FormSection>

                <FormSection title="Location">
                  <Field
                    label="State *"
                    value={form.state}
                    onChange={(value) => updateField("state", value)}
                    placeholder="Karnataka"
                  />

                  <Field
                    label="District *"
                    value={form.district}
                    onChange={(value) => updateField("district", value)}
                    placeholder="Bengaluru Urban"
                  />

                  <Field
                    label="City *"
                    value={form.city}
                    onChange={(value) => updateField("city", value)}
                    placeholder="Bengaluru"
                  />

                  <Field
                    label="Latitude *"
                    value={form.latitude}
                    onChange={(value) => updateField("latitude", value)}
                    placeholder="12.9716"
                    type="number"
                    step="any"
                  />

                  <Field
                    label="Longitude *"
                    value={form.longitude}
                    onChange={(value) => updateField("longitude", value)}
                    placeholder="77.5946"
                    type="number"
                    step="any"
                  />
                </FormSection>

                <FormSection title="Financial information">
                  <Field
                    label="Approved Budget (₹) *"
                    value={form.approvedBudget}
                    onChange={(value) =>
                      updateField("approvedBudget", value)
                    }
                    placeholder="500000000"
                    type="number"
                  />

                  <Field
                    label="Tender Amount (₹) *"
                    value={form.tenderAmount}
                    onChange={(value) => updateField("tenderAmount", value)}
                    placeholder="475000000"
                    type="number"
                  />

                  <Field
                    label="Current Expenditure (₹)"
                    value={form.currentExpenditure}
                    onChange={(value) =>
                      updateField("currentExpenditure", value)
                    }
                    placeholder="125000000"
                    type="number"
                  />
                </FormSection>

                <FormSection title="Timeline & delivery">
                  <Field
                    label="Start Date *"
                    value={form.startDate}
                    onChange={(value) => updateField("startDate", value)}
                    type="date"
                  />

                  <Field
                    label="Expected Completion *"
                    value={form.expectedCompletionDate}
                    onChange={(value) =>
                      updateField("expectedCompletionDate", value)
                    }
                    type="date"
                  />

                  <Field
                    label="Contractor Name *"
                    value={form.contractorName}
                    onChange={(value) =>
                      updateField("contractorName", value)
                    }
                    placeholder="ABC Infrastructure Ltd."
                  />

                  <Field
                    label="Reported Progress (%)"
                    value={form.reportedProgress}
                    onChange={(value) =>
                      updateField("reportedProgress", value)
                    }
                    type="number"
                    min="0"
                    max="100"
                  />

                  <label className="space-y-2">
                    <span className="text-xs font-medium text-slate-400">
                      Current Status
                    </span>
                    <select
                      value={form.status}
                      onChange={(event) =>
                        updateField(
                          "status",
                          event.target.value
                        )
                      }
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-slate-100 outline-none focus:border-blue-400/50"
                    >
                      <option value="planned">Planned</option>
                      <option value="ongoing">Ongoing</option>
                      <option value="delayed">Delayed</option>
                      <option value="completed">Completed</option>
                      <option value="on_hold">On Hold</option>
                    </select>
                  </label>
                </FormSection>

                <div className="flex justify-end gap-3 border-t border-white/10 pt-5">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="rounded-xl border border-white/10 px-5 py-2.5 text-sm font-semibold text-slate-300 hover:bg-white/5"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {saving ? "Saving..." : "Create Project"}
                  </button>
                </div>
              </form>
            </GlassCard>
          </div>
        </div>
      )}
    </div>
  );
}

function FormSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h3 className="mb-3 text-sm font-semibold text-slate-200">{title}</h3>
      <div className="grid gap-4 md:grid-cols-2">{children}</div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  wide = false,
  step,
  min,
  max,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  wide?: boolean;
  step?: string;
  min?: string;
  max?: string;
}) {
  return (
    <label className={`space-y-2 ${wide ? "md:col-span-2" : ""}`}>
      <span className="text-xs font-medium text-slate-400">{label}</span>

      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        step={step}
        min={min}
        max={max}
        className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-slate-100 outline-none placeholder:text-slate-600 focus:border-blue-400/50"
      />
    </label>
  );
}