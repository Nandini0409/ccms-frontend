import { useEffect, useState } from "react"
import { getStudentDashboard } from "../api"
import toast from "react-hot-toast"

export function useStudentDashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getStudentDashboard()
      .then(res => setStats(res.data.detail))
      .catch((err) => {
        toast.error(err.response?.data?.message||"Failed to load")
        setError(err.response?.data?.message || "Failed to load")})
      .finally(() => setLoading(false))
  }, [])

  return { stats, loading, error }
}
