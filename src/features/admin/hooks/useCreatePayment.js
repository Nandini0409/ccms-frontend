import { useState } from "react"
import { createPayment } from "../api"
import toast from "react-hot-toast"

export function useCreatePayment(onSuccess) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function create(form) {
    try {
      setLoading(true)
      setError(null)

      await createPayment({
        student_id: form.student_id,
        batch_id: form.batch_id,
        amount_paid: Number(form.amount_paid),
        payment_date: form.payment_date,
        mode: form.mode,
      })
      toast.success("Payment added successfully")
      onSuccess?.()
    } catch (err) {
      if (err.response?.status === 422) {
        toast.error("Invalid data. Please check inputs.")
        setError("Invalid data. Please check inputs.")
      } else {
        toast.error(err.response?.data?.message || "Failed to record payment")
        setError(err.response?.data?.message || "Failed to record payment")
      }
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { create, loading, error }
}
