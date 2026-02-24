import { useEffect } from "react"
import { useOutletContext } from "react-router-dom"
import Input from "../../../components/ui/Input"
import Button from "../../../components/ui/Button"
import { useForceChangePassword } from "../hooks/useForceChangePassword"

function ForceChangePassword() {
  const setMeta = useOutletContext()
  const { form, loading, error, handleChange, handleSubmit } = useForceChangePassword()

  useEffect(() => {
    setMeta({
      title: "Change Password",
      description: "You must update your password before continuing.",
    })
  }, [])

  return (
    <form onSubmit={handleSubmit} className="space-y-12">
      <div className="space-y-4">
        <Input type="password" name="currentPassword" placeholder="Current password" value={form.currentPassword} onChange={handleChange} autoFocus />
        <Input type="password" name="newPassword" placeholder="New password" value={form.newPassword} onChange={handleChange} />
        <Input type="password" name="confirmPassword" placeholder="Confirm new password" value={form.confirmPassword} onChange={handleChange} />
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Updating..." : "Update Password"}
      </Button>
    </form>
  )
}

export default ForceChangePassword
