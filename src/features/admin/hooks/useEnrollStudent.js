import { useState } from "react"
import { enrollStudent } from "../api"
import toast from "react-hot-toast"

export function useEnrollStudent(batchId, onSuccess) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function enroll(studentId) {
    try {
      setLoading(true)
      setError(null)

      await enrollStudent({
        student_id: studentId,
        batch_id: batchId,
      })
      toast.success("Student enrolled successfully")
      onSuccess?.()
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to enroll student")
      setError(err.response?.data?.message || "Failed to enroll student")
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { enroll, loading, error, setError }
}
