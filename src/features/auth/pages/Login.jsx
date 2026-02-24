import { useEffect } from "react"
import { useOutletContext } from "react-router-dom"
import Input from "../../../components/ui/Input"
import Button from "../../../components/ui/Button"
import { useLogin } from "../hooks/useLogin"

function Login() {
  const setMeta = useOutletContext()
  const { form, loading, error, handleChange, handleSubmit } = useLogin()

  useEffect(() => {
    setMeta({
      title: "Login",
      description: "Login to continue to your dashboard",
    })
  }, [])

  return (
    <form onSubmit={handleSubmit} className="space-y-12 mt-10">
      <div className="space-y-4">
        <Input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} autoFocus />
        <Input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </Button>
    </form>
  )
}

export default Login
