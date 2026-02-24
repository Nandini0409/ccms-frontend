import { useEffect, useState } from "react"
import { fetchStudents } from "../api"
import toast from "react-hot-toast"

export function useAdminStudents() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function load() {
    try {
      setLoading(true)
      const res = await fetchStudents()
      setStudents(res.data.detail.students || [])
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch students")
      setError(err.response?.data?.message || "Failed to fetch students")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  return { students, loading, error, refresh: load }
}
