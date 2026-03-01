import { useState } from "react"
import { createTeacher } from "../api"
import toast from "react-hot-toast"

export function useCreateTeacher(onSuccess) {
  const [loading, setLoading] = useState(false)
  const [tempPassword, setTempPassword] = useState(null)

  async function create(form) {
    try {
      setLoading(true)

      const res = await createTeacher({
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim() || null,
      })

      toast.success("Teacher added successfully")
      onSuccess?.()
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add teacher")
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    create,
    loading,
  }
}
