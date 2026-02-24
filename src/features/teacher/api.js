import axios from "../../lib/axios"

export function fetchTeacherBatches() {
  return axios.get("/teacher/batches")
}

export function fetchTeacherBatch(batch_id) {
  return axios.get("/teacher/batches", { params: { batch_id } })
}

export function fetchBatchStudents(batch_id) {
  return axios.get(`/teacher/batches/${batch_id}/students`)
}

export function submitAttendance(payload) {
  return axios.post("/teacher/attendance", payload)
}
