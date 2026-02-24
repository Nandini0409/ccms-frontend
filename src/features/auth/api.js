import axios from "../../lib/axios"

export async function login(payload) {
  const res = await axios.post("/auth/login", payload)
  return res.data.detail
}

export async function forceChangePassword(payload) {
  const res = await axios.post("/auth/force-change-password", payload)
  return res.data.detail || res.data
}
