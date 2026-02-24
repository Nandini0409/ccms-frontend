import { useEffect, useState } from "react"
import { fetchFees, createFee } from "../api"
import toast from "react-hot-toast"

export function useAdminFees() {
  const [fees, setFees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function load() {
    try {
      setLoading(true)
      setError(null)
      const res = await fetchFees()
      setFees(res.data.detail.fees || [])
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch fees")
      setError(err.response?.data?.message || "Failed to fetch fees")
    } finally {
      setLoading(false)
    }
  }

  async function addFee(form) {
    await createFee({
      batch_id: form.batch_id,
      amount: Number(form.amount),
      period: form.period.trim(),
    })
    toast.success("Fee record added successfully")
    await load()
  }

  useEffect(() => {
    load()
  }, [])

  return { fees, loading, error, setError, addFee, refresh: load }
}
