import { useEffect, useState } from "react"
import {
  getStudentBatch,
  getStudentAttendance,
  getStudentFees,
} from "../api"
import toast from "react-hot-toast"

export function useStudentBatchDetail(batch_id) {
  const [batch, setBatch] = useState(null)
  const [attendance, setAttendance] = useState(null)
  const [fees, setFees] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    Promise.all([
      getStudentBatch(batch_id),
      getStudentAttendance(batch_id),
      getStudentFees(batch_id),
    ])
      .then(([b, a, f]) => {
        setBatch(b.data.detail)
        setAttendance(a.data.detail)
        setFees(f.data.detail[0])
      })
      .catch((err) =>{
        toast.error(err.response?.data?.message||"Failed to load")
        setError(err.response?.data?.message || "Failed to load")
        })
      .finally(() => setLoading(false))
  }, [batch_id])

  return { batch, attendance, fees, loading, error }
}
