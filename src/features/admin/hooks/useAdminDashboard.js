import { useEffect, useState } from "react"
import { fetchAdminDashboard } from "../api"
import toast from "react-hot-toast"

export function useAdminDashboard() {
  const [dashboard, setDashboard] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const res = await fetchAdminDashboard()
        setDashboard(res.data.detail)
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to fetch data")
        setError(err.response?.data?.message || "Failed to fetch data")
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])
  return { dashboard, loading, error }
}
