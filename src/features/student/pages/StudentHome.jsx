import { useStudentDashboard } from "../hooks/useStudentDashboard"

function StatCard({ label, value }) {
  return (
    <div className="rounded-lg p-5 shadow-sm bg-[var(--bg-surface)] border border-[var(--border)]">
      <p className="text-sm text-[var(--text-muted)]">{label}</p>
      <p className="text-xl font-semibold mt-2 text-[var(--text-main)]">
        {value}
      </p>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div className="rounded-lg p-6 bg-[var(--bg-surface)] border border-[var(--border)]">
      <h2 className="text-sm font-medium mb-4 text-[var(--text-muted)]">
        {title}
      </h2>
      {children}
    </div>
  )
}

export default function StudentHome() {
  const { stats, loading, error } = useStudentDashboard()

  if (loading) return <p className="text-[var(--text-main)] p-4">Loading...</p>
  if (error) return <p className="text-red-500 p-4">{error}</p>

  return (
    <div className="space-y-8">
      <h1 className="text-2xl pt-3 px-2 font-semibold text-[var(--text-main)]">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatCard label="Total Batches" value={stats.totalBatches} />
        <StatCard
          label="Fees Paid"
          value={`₹ ${stats.fees.paid} / ₹ ${stats.fees.total}`}
        />
      </div>

      <Section title="Your Dashboard Info">
        <ul className="text-sm space-y-2 text-[var(--text-muted)]">
          <li>• View your enrolled batches</li>
          <li>• Track fee payments</li>
          <li>• Monitor attendance</li>
        </ul>
      </Section>
    </div>
  )
}
