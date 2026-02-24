import { Route } from "react-router-dom"
import AuthLayout from "../layouts/AuthLayout"
import Login from "../features/auth/pages/Login"
import ForceChangePassword from "../features/auth/pages/ForceChangePsw"

const AuthRoutes = (
  <Route path="/auth" element={<AuthLayout />}>
    <Route path="login" element={<Login />} />
    <Route path="force-change-password" element={<ForceChangePassword />} />
  </Route>
)

export default AuthRoutes
