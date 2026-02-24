import { useEffect, useState } from "react"
import { fetchPayments } from "../api"
import toast from "react-hot-toast"

export function useAdminPayments() {
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function load() {
    try {
      setLoading(true)
      const res = await fetchPayments()
      setPayments(res.data.detail.payments || [])
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch payments")
      setError(err.response?.data?.message || "Failed to fetch payments")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  return { payments, loading, error, refresh: load, setError }
}
