import { Route, Routes } from "react-router-dom"
import AuthRoutes from "./routes/AuthRoutes"
import AdminRoutes from "./routes/AdminRoutes"
import StudentRoutes from "./routes/StudentRoutes"
import TeacherRoutes from "./routes/TeacherRoutes"
import { Toaster } from "react-hot-toast"
import { Navigate } from "react-router-dom"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/auth/login" replace />} />
        {AuthRoutes}
        {StudentRoutes}
        {AdminRoutes}
        {TeacherRoutes}
      </Routes>
      <Toaster position="top-right" />
    </>
  )
}

export default App

