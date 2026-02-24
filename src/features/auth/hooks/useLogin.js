import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { login } from "../api"
import { validateLogin } from "../validators"
import { AUTH_ROUTES } from "../routes"
import toast from "react-hot-toast"

export function useLogin() {
  const navigate = useNavigate()

  const [form, setForm] = useState({ email: "", password: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)

    const validationError = validateLogin(form)
    if (validationError){
      toast.error(validationError)
      return setError(validationError)
    }

    const payload = {
      email: form.email.trim().toLowerCase(),
      password: form.password.trim(),
    }

    try {
      setLoading(true)
      const detail = await login(payload)
      if (detail.force_password_change) {
        toast("Please change your password to continue")
        navigate(AUTH_ROUTES.forceChange, {
          state: { email: detail.email },
        })
        return
      }

      localStorage.setItem("access_token", detail.access_token)
      localStorage.setItem("role", detail.role)
      localStorage.setItem("email", detail.email)
      toast.success("Login successful!")
      navigate(AUTH_ROUTES[detail.role] || AUTH_ROUTES.login)

    } catch (err) {
      toast.error(err.response?.data?.message||"Login failed. Try again.")
      setError(err.response?.data?.message || "Login failed. Try again.")
    } finally {
      setLoading(false)
    }
  }

  return { form, loading, error, handleChange, handleSubmit }
}
