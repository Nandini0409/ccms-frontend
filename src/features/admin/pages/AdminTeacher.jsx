import { useState } from "react"
import { useAdminTeachers } from "../hooks/useAdminTeachers"
import { useCreateTeacher } from "../hooks/useCreateTeacher"

function AdminTeacher() {
  const { teachers, loading, error, refresh } = useAdminTeachers()

  const {
    create,
    loading: creating,
    tempPassword,
    copyPassword,
    clearTempPassword
  } = useCreateTeacher(() => {
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

  async function handleAddTeacher(e) {
    e.preventDefault()
    await create(form)
  }

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-[var(--text-main)]">
          Teachers
        </h1>

        <button
          onClick={() => setShowForm(prev => !prev)}
          className="px-4 py-2 rounded-md bg-[var(--primary)] text-white text-sm font-medium hover:opacity-90"
        >
          {showForm ? "Cancel" : "Add Teacher"}
        </button>
      </div>

      {tempPassword && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm space-y-4">
            <h3 className="text-lg font-semibold">Temporary Password</h3>

            <div className="bg-slate-100 rounded px-3 py-2 font-mono text-center">
              {tempPassword}
            </div>

            <div className="flex gap-2">
              <button
                onClick={copyPassword}
                className="flex-1 px-3 py-2 rounded-md bg-[var(--primary)] text-white hover:opacity-90"
              >
                Copy
              </button>

              <button
                onClick={clearTempPassword}
                className="flex-1 px-3 py-2 rounded-md border"
              >
                Close
              </button>
            </div>

            <p className="text-xs text-slate-500">
              This is a one-time password. It will not be shown again. Ask the teacher to change it after login.
            </p>
          </div>
        </div>
      )}

      {showForm && (
        <form onSubmit={handleAddTeacher} className="bg-white border rounded-lg p-4 space-y-4">
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
            placeholder="Phone (10 digits)"
            className="w-full border px-3 py-2 rounded-md"
          />

          <button
            disabled={creating}
            className="px-4 py-2 rounded-md bg-[var(--primary)] text-white"
          >
            {creating ? "Adding..." : "Create Teacher"}
          </button>
        </form>
      )}

      <div className="bg-white border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b">
            <tr className="text-left text-slate-600">
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Phone</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="3" className="px-4 py-10 text-center text-slate-400">
                  Loading...
                </td>
              </tr>
            ) : teachers.length === 0 ? (
              <tr>
                <td colSpan="3" className="px-4 py-10 text-center text-slate-400">
                  No teacher added yet.
                </td>
              </tr>
            ) : (
              teachers.map((teacher) => (
                <tr key={teacher.teacher_id} className="border-b">
                  <td className="px-4 py-3">{teacher.name}</td>
                  <td className="px-4 py-3">{teacher.email}</td>
                  <td className="px-4 py-3">{teacher.phone || "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default AdminTeacher
