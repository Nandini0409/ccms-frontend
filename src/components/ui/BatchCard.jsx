import { useNavigate } from "react-router-dom"

function BatchCard({ id, name, course, schedule, actionLabel, actionTo }) {
  const navigate = useNavigate()

  return (
    <div
      className="rounded-lg p-5 flex flex-col gap-3 justify-between transition-shadow duration-200
                 shadow-[0_4px_12px_rgba(0,0,0,0.08)]
                 hover:shadow-[0_8px_20px_rgba(0,0,0,0.12)]"
      style={{
        backgroundColor: "var(--bg-surface)",
        border: "1px solid var(--border)",
        borderTop: "4px solid var(--primary)",
      }}
    >
      <div className="space-y-1">
        <p className="text-lg font-semibold" style={{ color: "var(--text-main)" }}>
          {name}
        </p>

        <p className="text-md" style={{ color: "var(--text-muted)" }}>
          <span className="text-[var(--text-main)] font-medium">Course:</span> {course}
        </p>

        <p className="text-md" style={{ color: "var(--text-muted)" }}>
          <span className="text-[var(--text-main)] font-medium">Schedule:</span> {schedule}
        </p>
      </div>

      <button
        onClick={() => navigate(actionTo)}
        className="mt-4 self-start text-sm font-medium underline underline-offset-4 hover:opacity-80 transition"
        style={{ color: "var(--primary)" }}
      >
        {actionLabel} →
      </button>
    </div>
  )
}

export default BatchCard
