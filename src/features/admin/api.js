import axios from "../../lib/axios"

export const fetchAdminBatches = () => axios.get("/admin/batch")
export const createAdminBatch = (data) => axios.post("/admin/batch", data)

export const fetchBatchStudents = (batchId) =>
  axios.get(`/admin/batch/${batchId}/students`)

export const fetchBatchTeachers = (batchId) =>
  axios.get(`/admin/batch/${batchId}/teachers`)

export const fetchAllStudents = () => axios.get("/admin/student")
export const fetchAllTeachers = () => axios.get("/admin/teacher")

export const enrollStudent = (payload) =>
  axios.post("/admin/enrollment", payload)

export const assignTeacher = (payload) =>
  axios.post("/admin/teacher-batch", payload)

export const fetchFees = () => axios.get("/admin/fees")
export const createFee = (data) => axios.post("/admin/fees", data)

export const fetchPayments = () => axios.get("/admin/payments")
export const createPayment = (data) => axios.post("/admin/payments", data)

export const fetchStudents = () => axios.get("/admin/student")
export const createStudent = (data) => axios.post("/admin/student", data)

export const fetchTeachers = () => axios.get("/admin/teacher")
export const createTeacher = (data) => axios.post("/admin/teacher", data)

export const fetchAdminDashboard = () => axios.get("/admin/dashboard")
