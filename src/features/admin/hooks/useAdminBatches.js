import { useEffect, useState } from "react"
import { fetchAdminBatches, createAdminBatch } from "../api"
import toast from "react-hot-toast"

export function useAdminBatches() {
  const [batches, setBatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function load() {
    try {
      setLoading(true)
      setError(null)
      const res = await fetchAdminBatches()
      setBatches(res.data.detail.batches || [])
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch batches")
      setError(err.response?.data?.message || "Failed to fetch batches")
    } finally {
      setLoading(false)
    }
  }

  async function addBatch(form) {
    await createAdminBatch({
      name: form.name.trim(),
      course: form.course.trim(),
      schedule: form.schedule.trim(),
    })
    toast.success("Batch added successfully!")
    await load()
  }

  useEffect(() => {
    load()
  }, [])

  return { batches, loading, error, setError, addBatch }
}
