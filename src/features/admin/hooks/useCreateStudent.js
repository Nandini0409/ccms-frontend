import { useState } from "react"
import { createStudent } from "../api"
import toast from "react-hot-toast"

export function useCreateStudent(onSuccess) {
  const [loading, setLoading] = useState(false)
  const [tempPassword, setTempPassword] = useState(null)

  async function create(form) {
    try {
      setLoading(true)

      const res = await createStudent({
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim() || null,
      })
      setTempPassword(res.data.detail.temporary_password)
      toast.success("Student created. Copy the temporary password.")
      onSuccess?.()
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add student")
      throw err
    } finally {
      setLoading(false)
    }
  }

  async function copyPassword() {
    try {
      await navigator.clipboard.writeText(tempPassword)
      toast.success("Password copied")
    } catch {
      toast.error("Failed to copy password")
    }
  }

  function clearTempPassword() {
    setTempPassword(null)
  }

  return {
    create,
    loading,
    tempPassword,
    copyPassword,
    clearTempPassword
  }
}
