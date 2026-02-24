import { useParams } from "react-router-dom"
import { useTeacherAttendance } from "../hooks/useTeacherAttendance"

export default function TeacherAttendance() {
  const { batch_id } = useParams()

  const {
    batch,
    students,
    attendance,
    date,
    setDate,
    loading,
    error,
    submitting,
    toggleAttendance,
    saveAttendance,
  } = useTeacherAttendance(batch_id)


  if (!batch_id) {
    return <p className="text-[var(--text-main)] p-4">Batch not selected</p>
  }

  if (loading) {
    return <p className="text-[var(--text-main)] p-4">Loading...</p>
  }


  if (!batch) {
    return <p className="text-[var(--text-main)] p-4">Batch not found</p>
  }

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

      <div className="px-3 space-y-3">
        <div>
          <h2 className="text-lg font-semibold text-[var(--text-main)]">
            Take Attendance
          </h2>
          <p className="text-sm text-[var(--text-muted)]">
            Mark present / absent for selected date
          </p>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-sm text-[var(--text-muted)]">
            Date:
          </label>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="px-3 py-1.5 rounded-md border border-[var(--border)] bg-[var(--bg-surface)] text-sm text-[var(--text-main)]"
          />
        </div>
      </div>

      <div className="rounded-lg p-5 bg-[var(--bg-surface)] border border-[var(--border)] shadow-sm space-y-3">
        {students.length === 0 && (
          <p className="text-sm text-[var(--text-muted)]">
            No students found in this batch
          </p>
        )}

        {students.map(student => {
          const status = attendance[student.student_id]

          return (
            <div
              key={student.student_id}
              className="flex items-center justify-between p-3 rounded-md border border-[var(--border)]"
            >
              <div>
                <p className="font-medium text-[var(--text-main)]">
                  {student.name}
                </p>
                <p className="text-xs text-[var(--text-muted)]">
                  {student.email}
                </p>
              </div>

              <button
                onClick={() => toggleAttendance(student.student_id)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition
                  ${
                    status === "PRESENT"
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
              >
                {status === "PRESENT" ? "Present" : "Absent"}
              </button>
            </div>
          )
        })}
      </div>

      {students.length > 0 && (
        <div className="px-3 pb-4">
          <button
            onClick={saveAttendance}
            disabled={submitting}
            className="px-4 py-2 rounded-lg bg-[var(--primary)] text-white text-sm disabled:opacity-60"
          >
            {submitting ? "Saving..." : "Save Attendance"}
          </button>
        </div>
      )}
    </div>
  )
}
