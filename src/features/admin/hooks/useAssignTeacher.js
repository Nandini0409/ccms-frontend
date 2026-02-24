import { useState } from "react"
import { assignTeacher } from "../api"
import toast from "react-hot-toast"

export function useAssignTeacher(batchId, onSuccess) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function assign(teacherId) {
    try {
      setLoading(true)
      setError(null)

      await assignTeacher({
        teacher_id: teacherId,
        batch_id: batchId,
      })
      toast.success("Teacher assign successfully")
      onSuccess?.()
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to assign teacher")
      setError(err.response?.data?.message || "Failed to assign teacher")
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { assign, loading, error, setError }
}
