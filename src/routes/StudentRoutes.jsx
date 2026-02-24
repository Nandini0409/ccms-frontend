import { Route } from "react-router-dom"
import DashboardLayout from "../layouts/DashboardLayout"
import StudentBatch from "../features/student/pages/StudentBatch"
import StudentHome from "../features/student/pages/StudentHome"
import StudentBatchDetail from "../features/student/pages/StudentBatchDetails"

const StudentRoutes = (
  <Route path="/student" element={<DashboardLayout role="student" />}>
    <Route index element={<StudentHome />} />
    <Route path="batches" element={<StudentBatch />} />
    <Route path="batch/:batch_id" element={<StudentBatchDetail/>}/>

  </Route>
)

export default StudentRoutes
