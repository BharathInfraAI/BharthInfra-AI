import { AuthorityLoginButton } from "@/components/auth/authority-login-button";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Navigation */}
      <nav className="border-b border-slate-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-xl font-bold tracking-tight">
              Bharath Infra AI
            </h1>
            <p className="text-xs text-slate-400">
              Smart Infrastructure Monitoring
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button className="rounded-lg px-4 py-2 text-sm text-slate-300 hover:bg-slate-800">
              Explore Projects
            </button>

            <AuthorityLoginButton />
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-4xl">
          <div className="mb-6 inline-flex rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-300">
            AI-Powered Infrastructure Intelligence
          </div>

          <h2 className="text-5xl font-bold leading-tight tracking-tight md:text-6xl">
            Monitor infrastructure.
            <br />
            <span className="text-slate-400">
              Detect risks before they grow.
            </span>
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            Bharath Infra AI combines project data, field updates,
            construction images, satellite intelligence and AI analytics
            to help authorities monitor infrastructure projects smarter.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button className="rounded-xl bg-white px-6 py-3 font-semibold text-slate-950 hover:bg-slate-200">
              View Projects
            </button>

            <button className="rounded-xl border border-slate-700 px-6 py-3 font-semibold text-white hover:bg-slate-900">
              Explore Dashboard
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-5 md:grid-cols-3">
          <FeatureCard
            title="Predictive Risk"
            description="Identify potential delays, cost overruns and high-risk projects before they become critical."
          />

          <FeatureCard
            title="AI Verification"
            description="Compare reported project progress with construction-site evidence and visual analysis."
          />

          <FeatureCard
            title="Satellite Intelligence"
            description="Use geospatial and satellite data to monitor large-scale infrastructure changes."
          />
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-slate-800 bg-slate-900/40">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-12 md:grid-cols-4">
          <Stat value="248" label="Projects Monitored" />
          <Stat value="31" label="High-Risk Projects" />
          <Stat value="18" label="Delayed Projects" />
          <Stat value="₹2,480 Cr" label="Project Value" />
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto max-w-7xl px-6 py-8 text-sm text-slate-500">
        © 2026 Bharath Infra AI · Smart Infrastructure Monitoring Platform
      </footer>
    </main>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-3 leading-7 text-slate-400">{description}</p>
    </div>
  );
}

function Stat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div>
      <p className="text-3xl font-bold">{value}</p>
      <p className="mt-1 text-sm text-slate-400">{label}</p>
    </div>
  );
}
