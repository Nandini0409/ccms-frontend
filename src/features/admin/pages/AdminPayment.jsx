import { useState } from "react"
import { useAdminPayments } from "../hooks/useAdminPayments"
import { useCreatePayment } from "../hooks/useCreatePayment"
import { useAdminStudents } from "../hooks/useAdminStudents"
import { useAdminBatches } from "../hooks/useAdminBatches"

function AdminPayment() {
  const { payments, loading, error, refresh, setError } = useAdminPayments()
  const { students } = useAdminStudents()
  const { batches } = useAdminBatches()
  const { create, loading: creating, error: createError } = useCreatePayment(refresh)

  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    student_id: "",
    batch_id: "",
    amount_paid: "",
    payment_date: "",
    mode: "cash",
  })

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  function validateForm() {
    if (!form.student_id) return "Select student"
    if (!form.batch_id) return "Select batch"
    if (!form.amount_paid || Number(form.amount_paid) <= 0) return "Enter valid amount"
    if (!form.payment_date) return "Select payment date"
    return null
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)

    const err = validateForm()
    if (err) return setError(err)

    try {
      await create(form)
      setForm({
        student_id: "",
        batch_id: "",
        amount_paid: "",
        payment_date: "",
        mode: "cash",
      })
      setShowForm(false)
    } catch {}
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Payments</h1>
        <button
          onClick={() => setShowForm(p => !p)}
          className="px-4 py-2 bg-[var(--primary)] text-white rounded-md"
        >
          {showForm ? "Cancel" : "Record Payment"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white border rounded-lg p-4 space-y-4">
          <select name="student_id" value={form.student_id} onChange={handleChange} className="w-full border p-2 rounded">
            <option value="">Select Student</option>
            {students.map(s => (
              <option key={s.student_id} value={s.student_id}>{s.name}</option>
            ))}
          </select>

          <select name="batch_id" value={form.batch_id} onChange={handleChange} className="w-full border p-2 rounded">
            <option value="">Select Batch</option>
            {batches.map(b => (
              <option key={b.batch_id} value={b.batch_id}>{b.name}</option>
            ))}
          </select>

          <input type="number" name="amount_paid" value={form.amount_paid} onChange={handleChange} placeholder="Amount" className="w-full border p-2 rounded" />
          <input type="date" name="payment_date" value={form.payment_date} onChange={handleChange} className="w-full border p-2 rounded" />

          <select name="mode" value={form.mode} onChange={handleChange} className="w-full border p-2 rounded">
            <option value="cash">Cash</option>
            <option value="upi">UPI</option>
            <option value="card">Card</option>
            <option value="bank">Bank Transfer</option>
          </select>

          <button disabled={creating} className="px-4 py-2 bg-[var(--primary)] text-white rounded-md">
            {creating ? "Recording..." : "Save Payment"}
          </button>
        </form>
      )}

      <div className="bg-white border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left">Student</th>
              <th className="px-4 py-3 text-left">Batch</th>
              <th className="px-4 py-3 text-left">Amount</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Mode</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" className="p-6 text-center">Loading...</td></tr>
            ) : payments.length === 0 ? (
              <tr><td colSpan="5" className="p-6 text-center">No payments yet.</td></tr>
            ) : (
              payments.map(p => (
                <tr key={p.payment_id} className="border-b">
                  <td className="px-4 py-3">{p.student_name}</td>
                  <td className="px-4 py-3">{p.batch_name}</td>
                  <td className="px-4 py-3">₹ {p.amount_paid}</td>
                  <td className="px-4 py-3">{new Date(p.payment_date).toLocaleDateString()}</td>
                  <td className="px-4 py-3 capitalize">{p.mode}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminPayment
