import { Route } from "react-router-dom"
import DashboardLayout from "../layouts/DashboardLayout"
import AdminHome from "../features/admin/pages/AdminHome"
import AdminStudent from "../features/admin/pages/AdminStudent"
import AdminTeacher from "../features/admin/pages/AdminTeacher"
import AdminBatch from "../features/admin/pages/AdminBatch"
import AdminBatchDetails from "../features/admin/pages/AdminBatchDetails"
import AdminPayment from "../features/admin/pages/AdminPayment"
import AdminFee from "../features/admin/pages/AdminFee"

const AdminRoutes = (
  <Route path="/admin" element={<DashboardLayout role="admin" />}>
    <Route index element={<AdminHome />} />
    <Route path="students" element={<AdminStudent />} />
    <Route path="teachers" element={<AdminTeacher />} />
    <Route path="batches" element={<AdminBatch />} />
    <Route path="fees" element={<AdminFee />} />
    <Route path="payments" element={<AdminPayment />} />
    <Route path="batch/:batchId" element={<AdminBatchDetails/>}/>
  </Route>
)

export default AdminRoutes

