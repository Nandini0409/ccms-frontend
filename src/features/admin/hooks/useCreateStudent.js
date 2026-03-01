import { useState } from "react"
import { createStudent } from "../api"
import toast from "react-hot-toast"

export function useCreateStudent(onSuccess) {
  const [loading, setLoading] = useState(false)

  async function create(form) {
    try {
      setLoading(true)

      const res = await createStudent({
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim() || null,
      })
      toast.success("Student created.")
      onSuccess?.()
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add student")
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
