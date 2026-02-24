import { useEffect, useState } from "react"
import { fetchTeacherBatches } from "../api"
import toast from "react-hot-toast"

export function useTeacherBatches() {
  const [batches, setBatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const res = await fetchTeacherBatches()
        setBatches(res.data.detail || [])
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to load batches")
        setError(err.response?.data?.message || "Failed to load batches")
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  return { batches, loading, error }
}
