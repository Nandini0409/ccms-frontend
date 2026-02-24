import { useParams } from "react-router-dom"
import { useState } from "react"
import { useAdminBatchDetails } from "../hooks/useAdminBatchDetails"
import { useEnrollStudent } from "../hooks/useEnrollStudent"
import { useAssignTeacher } from "../hooks/useAssignTeacher"

function AdminBatchDetails() {
  const { batchId } = useParams()

  const {
    studentsInBatch,
    teachersInBatch,
    allStudents,
    allTeachers,
    loading,
    error,
    setError,
    refresh,
  } = useAdminBatchDetails(batchId)

  const { enroll } = useEnrollStudent(batchId, refresh)
  const { assign } = useAssignTeacher(batchId, refresh)

  const [showStudentForm, setShowStudentForm] = useState(false)
  const [showTeacherForm, setShowTeacherForm] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState("")
  const [selectedTeacher, setSelectedTeacher] = useState("")

  async function handleEnroll(e) {
    e.preventDefault()
    if (!selectedStudent) return setError("Select student")

    await enroll(selectedStudent)
    setSelectedStudent("")
    setShowStudentForm(false)
  }

  async function handleAssignTeacher(e) {
    e.preventDefault()
    if (!selectedTeacher) return setError("Select teacher")

    await assign(selectedTeacher)
    setSelectedTeacher("")
    setShowTeacherForm(false)
  }

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-[var(--text-main)]">
          Batch Details
        </h1>
      </div>


      <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-lg overflow-hidden">
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <h2 className="font-semibold text-[var(--text-main)]">
            Enrolled Students
          </h2>

          <button
            onClick={() => setShowStudentForm(p => !p)}
            className="px-3 py-1 text-sm rounded-md bg-[var(--primary)] text-white"
          >
            {showStudentForm ? "Cancel" : "Add Student"}
          </button>
        </div>

        {showStudentForm && (
          <form onSubmit={handleEnroll} className="p-4 border-b space-y-3">
            <select
              value={selectedStudent}
              onChange={e => setSelectedStudent(e.target.value)}
              className="w-full border border-[var(--border)] px-3 py-2 rounded-md"
            >
              <option value="">Select Student</option>
              {allStudents.map(s => (
                <option key={s.student_id} value={s.student_id}>
                  {s.name}
                </option>
              ))}
            </select>

            <button
              type="submit"
              className="px-4 py-2 bg-[var(--primary)] text-white rounded-md"
            >
              Enroll Student
            </button>
          </form>
        )}

        <table className="w-full text-sm">
          <tbody>
            {loading ? (
              <tr>
                <td className="px-4 py-6 text-center text-[var(--text-muted)]">
                  Loading...
                </td>
              </tr>
            ) : studentsInBatch.length === 0 ? (
              <tr>
                <td className="px-4 py-6 text-center text-[var(--text-muted)]">
                  No students enrolled.
                </td>
              </tr>
            ) : (
              studentsInBatch.map(s => (
                <tr key={s.student_id} className="border-b">
                  <td className="px-4 py-3">{s.name}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-lg overflow-hidden">
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <h2 className="font-semibold text-[var(--text-main)]">
            Assigned Teachers
          </h2>

          <button
            onClick={() => setShowTeacherForm(p => !p)}
            className="px-3 py-1 text-sm rounded-md bg-[var(--primary)] text-white"
          >
            {showTeacherForm ? "Cancel" : "Add Teacher"}
          </button>
        </div>

        {showTeacherForm && (
          <form onSubmit={handleAssignTeacher} className="p-4 border-b space-y-3">
            <select
              value={selectedTeacher}
              onChange={e => setSelectedTeacher(e.target.value)}
              className="w-full border border-[var(--border)] px-3 py-2 rounded-md"
            >
              <option value="">Select Teacher</option>
              {allTeachers.map(t => (
                <option key={t.teacher_id} value={t.teacher_id}>
                  {t.name}
                </option>
              ))}
            </select>

            <button
              type="submit"
              className="px-4 py-2 bg-[var(--primary)] text-white rounded-md"
            >
              Assign Teacher
            </button>
          </form>
        )}

        <table className="w-full text-sm">
          <tbody>
            {teachersInBatch.length === 0 ? (
              <tr>
                <td className="px-4 py-6 text-center text-[var(--text-muted)]">
                  No teachers assigned.
                </td>
              </tr>
            ) : (
              teachersInBatch.map(t => (
                <tr key={t.teacher_id} className="border-b">
                  <td className="px-4 py-3">{t.name}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default AdminBatchDetails
