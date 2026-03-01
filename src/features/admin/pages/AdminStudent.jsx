import { useState } from "react"
import { useAdminStudents } from "../hooks/useAdminStudents"
import { useCreateStudent } from "../hooks/useCreateStudent"

function AdminStudent() {
  const { students, loading, error, refresh } = useAdminStudents()

  const {
    create,
    loading: creating,
  } = useCreateStudent(() => {
    refresh()
    setShowForm(false)
    setForm({ name: "", email: "", phone: "" })
  })

  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", phone: "" })

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  async function handleAddStudent(e) {
    e.preventDefault()
    await create(form)
  }

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-[var(--text-main)]">
          Students
        </h1>

        <button
          onClick={() => setShowForm(prev => !prev)}
          className="px-4 py-2 rounded-md bg-[var(--primary)] text-white text-sm font-medium hover:opacity-90"
        >
          {showForm ? "Cancel" : "Add Student"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAddStudent} className="bg-white border rounded-lg p-4 space-y-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full border px-3 py-2 rounded-md"
            required
          />

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border px-3 py-2 rounded-md"
            required
          />

          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full border px-3 py-2 rounded-md"
          />

          <button
            disabled={creating}
            className="px-4 py-2 rounded-md bg-[var(--primary)] text-white"
          >
            {creating ? "Adding..." : "Create Student"}
          </button>
        </form>
      )}

      <div className="bg-white border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Phone</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="3" className="text-center py-10">
                  Loading...
                </td>
              </tr>
            ) : students.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-10">
                  No students yet
                </td>
              </tr>
            ) : (
              students.map(s => (
                <tr key={s.student_id} className="border-b">
                  <td className="px-4 py-3">{s.name}</td>
                  <td className="px-4 py-3">{s.email}</td>
                  <td className="px-4 py-3">{s.phone || "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default AdminStudent
