import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { forceChangePassword } from "../api"
import { validateForceChange } from "../validators"
import { AUTH_ROUTES } from "../routes"
import toast from "react-hot-toast"

export function useForceChangePassword() {
  const navigate = useNavigate()
  const location = useLocation()
  const email = location.state?.email

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!email) navigate(AUTH_ROUTES.login)
  }, [email])

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)

    const validationError = validateForceChange(form)
    if (validationError){
      toast.error(validationError)
      return setError(validationError)
    }
    try {
      setLoading(true)

      const detail = await forceChangePassword({
        email,
        current_password: form.currentPassword,
        new_password: form.newPassword,
      })

      localStorage.setItem("access_token", detail.access_token)
      localStorage.setItem("role", detail.role)
      toast.success("Password updated successfully!")
      navigate(AUTH_ROUTES[detail.role] || AUTH_ROUTES.login)

    } catch (err) {
      toast.error(err.response?.data?.message||"Password update failed. Try again.")
      setError(
        err.response?.data?.message || "Password update failed. Try again."
      )
    } finally {
      setLoading(false)
    }
  }

  return { form, loading, error, handleChange, handleSubmit }
}
