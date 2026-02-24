import { useAdminDashboard } from "../hooks/useAdminDashboard"

function StatCard({ label, value }) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="text-xl font-semibold text-slate-800 mt-2">
        {value}
      </p>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6">
      <h2 className="text-sm font-medium text-slate-600 mb-4">
        {title}
      </h2>
      {children}
    </div>
  )
}

function AdminHome() {
  const { dashboard, loading, error } = useAdminDashboard()

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-2xl pt-3 font-semibold text-[var(--text-main)]">
          Dashboard
        </h1>
      </div>

      {loading && (
        <p className="text-sm text-slate-500">
          Loading dashboard data...
        </p>
      )}

      {!loading && !error && dashboard && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Students" value={dashboard.totalStudents} />
          <StatCard label="Total Teachers" value={dashboard.totalTeachers} />
          <StatCard label="Active Batches" value={dashboard.activeBatches} />
          <StatCard label="Total Revenue" value={`₹ ${dashboard.totalPayments}`} />
        </div>
      )}

      <Section title="System Status">
        <ul className="text-sm text-slate-600 space-y-2">
          <li>• Students, teachers, and batches are managed from their respective sections</li>
          <li>• Fees and payments are tracked centrally</li>
          <li>• Role-based access ensures controlled usage of the system</li>
        </ul>
      </Section>

    </div>
  )
}

export default AdminHome
