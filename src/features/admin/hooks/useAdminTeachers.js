import { useEffect, useState } from "react"
import { fetchTeachers } from "../api"
import toast from "react-hot-toast"

export function useAdminTeachers() {
  const [teachers, setTeachers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function load() {
    try {
      setLoading(true)
      setError(null)
      const res = await fetchTeachers()
      setTeachers(res.data.detail.teachers || [])
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch teachers.")
      setError(err.response?.data?.message || "Failed to fetch teachers.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  return { teachers, loading, error, refresh: load }
}
