import axios from "../../lib/axios"

export const getStudentDashboard = () =>
  axios.get("/student/dashboard")

export const getStudentBatches = () =>
  axios.get("/student/batch")

export const getStudentBatch = (batch_id) =>
  axios.get("/student/batch", { params: { batch_id } })

export const getStudentAttendance = (batch_id) =>
  axios.get("/student/attendance", { params: { batch_id } })

export const getStudentFees = (batch_id) =>
  axios.get("/student/fees", { params: { batch_id } })
