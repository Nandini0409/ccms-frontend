import { Link } from "react-router-dom"
import { useState } from "react"
import { useAdminBatches } from "../hooks/useAdminBatches"

function AdminBatch() {
  const { batches, loading, error, setError, addBatch } = useAdminBatches()

  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: "", course: "", schedule: "" })

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  function validateForm({ name, course, schedule }) {
    if (!name.trim()) return "Batch name is required"
    if (!course.trim()) return "Course is required"
    if (!schedule.trim()) return "Schedule is required"
    return null
  }

  async function handleCreateBatch(e) {
    e.preventDefault()
    setError(null)

    const err = validateForm(form)
    if (err) return setError(err)

    try {
      await addBatch(form)
      setForm({ name: "", course: "", schedule: "" })
      setShowForm(false)
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create batch")
    }
  }

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-[var(--text-main)]">
          Batches
        </h1>

        <button
          onClick={() => setShowForm(prev => !prev)}
          className="px-4 py-2 rounded-md bg-[var(--primary)] text-white text-sm font-medium hover:opacity-90"
        >
          {showForm ? "Cancel" : "Create Batch"}
        </button>
      </div>


      {showForm && (
        <form
          onSubmit={handleCreateBatch}
          className="bg-white border border-slate-200 rounded-lg p-4 space-y-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Batch Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          />

          <input
            type="text"
            name="course"
            placeholder="Course"
            value={form.course}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          />

          <input
            type="text"
            name="schedule"
            placeholder="Schedule (eg: Mon-Wed 6PM)"
            value={form.schedule}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          />

          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded-md bg-[var(--primary)] text-white text-sm font-medium"
          >
            {loading ? "Creating..." : "Create Batch"}
          </button>
        </form>
      )}

      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr className="text-left text-slate-600">
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Course</th>
              <th className="px-4 py-3 font-medium">Schedule</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="px-4 py-10 text-center text-slate-400">
                  Loading...
                </td>
              </tr>
            ) : batches.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-4 py-10 text-center text-slate-400">
                  No batches created yet.
                </td>
              </tr>
            ) : (
              batches.map((batch) => (
                <tr key={batch.batch_id} className="border-b">
                  <td className="px-4 py-3">{batch.name}</td>
                  <td className="px-4 py-3">{batch.course}</td>
                  <td className="px-4 py-3">{batch.schedule}</td>
                  <td className="px-4 py-3">
                    <Link
                      to={`/admin/batch/${batch.batch_id}`}
                      className="text-[var(--primary)] text-sm hover:underline"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default AdminBatch
