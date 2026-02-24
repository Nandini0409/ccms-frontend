import { useEffect, useState } from "react"
import { getStudentBatches } from "../api"
import toast from "react-hot-toast"

export function useStudentBatches() {
  const [batches, setBatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getStudentBatches()
      .then(res => setBatches(res.data.detail))
      .catch((err) => {
        toast.error(err.response?.data?.message||"Failed to load")
        setError(err.response?.data?.message || "Failed to load")
      })
      .finally(() => setLoading(false))
  }, [])

  return { batches, loading, error }
}
