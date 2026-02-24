import { useParams } from "react-router-dom"
import { useStudentBatchDetail } from "../hooks/useStudentBatchDetail"

function StatCard({ label, value }) {
  return (
    <div className="rounded-lg p-4 bg-[var(--bg-surface)] border border-[var(--border)] shadow-sm">
      <p className="text-xs text-[var(--text-muted)]">{label}</p>
      <p className="text-lg font-semibold text-[var(--text-main)]">{value}</p>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div className="rounded-lg p-5 bg-[var(--bg-surface)] border border-[var(--border)] shadow-sm">
      <h2 className="text-lg font-semibold text-[var(--text-main)] mb-3">
        {title}
      </h2>
      {children}
    </div>
  )
}

export default function StudentBatchDetail() {
  const { batch_id } = useParams()
  const { batch, attendance, fees, loading, error } =
    useStudentBatchDetail(batch_id)

  if (loading) return <p className="text-[var(--text-main)] p-4">Loading...</p>
  if (error) return <p className="text-red-500 p-4">{error}</p>
  if (!batch) return <p className="text-[var(--text-main)] p-4">Batch not found</p>

  return (
    <div className="space-y-6">
      <div className="px-3 pt-3">
        <h1 className="text-2xl font-semibold text-[var(--text-main)] my-1">
          {batch.name}
        </h1>
        <p className="text-sm text-[var(--text-muted)] font-medium">
          {batch.course} · {batch.schedule}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Fee" value={`₹${fees?.total_fee ?? 0}`} />
        <StatCard label="Paid" value={`₹${fees?.paid ?? 0}`} />
        <StatCard label="Remaining" value={`₹${fees?.remaining ?? 0}`} />
        <StatCard label="Attendance" value={`${attendance?.percentage ?? 0}%`} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Section title="My Attendance">
          <div className="space-y-1 text-sm">
            <p>Total Classes: {attendance?.total_classes ?? 0}</p>
            <p>Present: {attendance?.present ?? 0}</p>
            <p>Absent: {attendance?.absent ?? 0}</p>

            <div className="pt-3">
              <div className="h-2 w-full rounded-full bg-[var(--border)] overflow-hidden">
                <div
                  className="h-full bg-[var(--primary)] transition-all"
                  style={{ width: `${attendance?.percentage ?? 0}%` }}
                />
              </div>

              <div className="flex justify-between text-xs text-[var(--text-muted)] mt-1">
                <span>Attendance Progress</span>
                <span>{attendance?.percentage ?? 0}%</span>
              </div>
            </div>
          </div>
        </Section>


        <Section title="My Fees">
          <div className="space-y-1 text-sm">
            <p>Total: ₹{fees?.total_fee ?? 0}</p>
            <p>Paid: ₹{fees?.paid ?? 0}</p>
            <p>Remaining: ₹{fees?.remaining ?? 0}</p>

            <div className="pt-3">
              <div className="h-2 w-full rounded-full bg-[var(--border)] overflow-hidden">
                <div
                  className="h-full bg-[var(--primary)] transition-all"
                  style={{ width: `${fees?.percentage ?? 0}%` }}
                />
              </div>

              <div className="flex justify-between text-xs text-[var(--text-muted)] mt-1">
                <span>Fee Payment Progress</span>
                <span>{fees?.percentage ?? 0}%</span>
              </div>
            </div>
          </div>
        </Section>

      </div>
    </div>
  )
}
