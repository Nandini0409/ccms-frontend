export function validateLogin({ email, password }) {
  if (!email || !password) return "Email and password are required"
  if (!email.includes("@")) return "Enter a valid email address"
  if (password.length < 6) return "Password must be at least 6 characters"
  return null
}

export function validateForceChange({ currentPassword, newPassword, confirmPassword }) {
  if (!currentPassword || !newPassword || !confirmPassword) {
    return "All fields are required"
  }
  if (newPassword.length < 8) {
    return "New password must be at least 8 characters"
  }
  if (newPassword !== confirmPassword) {
    return "New password and confirm password do not match"
  }
  return null
}
