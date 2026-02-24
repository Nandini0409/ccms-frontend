import { useEffect, useState } from "react"
import {
  fetchTeacherBatch,
  fetchBatchStudents,
  submitAttendance,
} from "../api"
import toast from "react-hot-toast"

function getToday() {
  return new Date().toISOString().split("T")[0]
}

export function useTeacherAttendance(batch_id) {
  const [batch, setBatch] = useState(null)
  const [students, setStudents] = useState([])
  const [attendance, setAttendance] = useState({})
  const [date, setDate] = useState(getToday())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!batch_id) return

    async function load() {
      try {
        setLoading(true)
        setError(null)

        const batchRes = await fetchTeacherBatch(batch_id)
        setBatch(batchRes.data.detail)

        const studentsRes = await fetchBatchStudents(batch_id)
        const list = studentsRes.data?.detail || []

        setStudents(list)

        const initial = {}
        list.forEach(s => {
          initial[s.student_id] = "ABSENT"
        })

        setAttendance(initial)
      } catch (err) {
        toast.error(err.response?.data?.message||"Failed to fetch data")
        setError(err.response?.data?.message || "Failed to fetch data")
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [batch_id])

  function toggleAttendance(studentId) {
    setAttendance(prev => ({
      ...prev,
      [studentId]: prev[studentId] === "PRESENT" ? "ABSENT" : "PRESENT",
    }))
  }

  async function saveAttendance() {
    try {
      setSubmitting(true)

      const records = Object.entries(attendance).map(
        ([student_id, status]) => ({
          student_id,
          status,
        })
      )

      const payload = { batch_id, date, records }
      const res = await submitAttendance(payload)
      toast.success("Attendance saved!")
      return res
    } catch (err) {
      toast.error(err.response?.data?.message||"Failed to save attendance.")
      throw err
    }
   finally {
    setSubmitting(false)
  }
}

return {
  batch,
  students,
  attendance,
  date,
  setDate,
  loading,
  error,
  submitting,
  toggleAttendance,
  saveAttendance,
}
}
