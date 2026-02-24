import { useState } from "react"
import { useAdminFees } from "../hooks/useAdminFees"
import { useAdminBatches } from "../hooks/useAdminBatches"

function AdminFee() {
  const { fees, loading, error, setError, addFee } = useAdminFees()
  const { batches } = useAdminBatches()

  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    batch_id: "",
    amount: "",
    period: "",
  })

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  function validateForm({ batch_id, amount, period }) {
    if (!batch_id) return "Please select a batch"
    if (!amount || Number(amount) <= 0) return "Amount must be greater than 0"
    if (!period.trim()) return "Period is required"
    return null
  }

  async function handleAddFee(e) {
    e.preventDefault()
    setError(null)

    const err = validateForm(form)
    if (err) return setError(err)

    try {
      await addFee(form)
      setForm({ batch_id: "", amount: "", period: "" })
      setShowForm(false)
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add fee")
    }
  }

  function getBatchName(batch_id) {
    const batch = batches.find(b => b.batch_id === batch_id)
    return batch ? batch.name : "Unknown Batch"
  }

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-[var(--text-main)]">
          Fees
        </h1>

        <button
          onClick={() => setShowForm(prev => !prev)}
          className="px-4 py-2 text-sm rounded-md bg-[var(--primary)] text-white hover:opacity-90"
        >
          {showForm ? "Cancel" : "Add Fee"}
        </button>
      </div>


      {showForm && (
        <form
          onSubmit={handleAddFee}
          className="bg-white border border-slate-200 rounded-lg p-4 space-y-4"
        >
          <select
            name="batch_id"
            value={form.batch_id}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          >
            <option value="">Select Batch</option>
            {batches.map(batch => (
              <option key={batch.batch_id} value={batch.batch_id}>
                {batch.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={form.amount}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          />

          <input
            type="month"
            name="period"
            value={form.period}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          />

          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded-md bg-[var(--primary)] text-white text-sm font-medium"
          >
            {loading ? "Adding..." : "Create Fee"}
          </button>
        </form>
      )}

      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr className="text-left text-slate-600">
              <th className="px-4 py-3 font-medium">Batch</th>
              <th className="px-4 py-3 font-medium">Amount</th>
              <th className="px-4 py-3 font-medium">Period</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="3" className="px-4 py-10 text-center text-slate-400">
                  Loading...
                </td>
              </tr>
            ) : fees.length === 0 ? (
              <tr>
                <td colSpan="3" className="px-4 py-10 text-center text-slate-400">
                  No fees added yet.
                </td>
              </tr>
            ) : (
              fees.map(fee => (
                <tr key={fee.fee_id} className="border-b">
                  <td className="px-4 py-3">{getBatchName(fee.batch_id)}</td>
                  <td className="px-4 py-3">₹ {fee.amount}</td>
                  <td className="px-4 py-3">{fee.period}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <p className="text-sm text-slate-500">
        Fees define how much students are charged. Payments are managed separately.
      </p>
    </div>
  )
}

export default AdminFee
