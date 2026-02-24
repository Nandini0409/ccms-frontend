import { Route } from "react-router-dom"
import DashboardLayout from "../layouts/DashboardLayout"
import TeacherAttendance from "../features/teacher/pages/TeacherAttendance"
import TeacherBatch from "../features/teacher/pages/TeacherBatch"

const TeacherRoutes = (
  <Route path="/teacher" element={<DashboardLayout role="teacher" />}>
    <Route path="batches" element={<TeacherBatch />} />
    <Route path="batches/attendance/:batch_id" element={<TeacherAttendance />} />
  </Route>
)

export default TeacherRoutes
