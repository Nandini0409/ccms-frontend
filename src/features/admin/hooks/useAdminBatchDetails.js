import { useEffect, useState } from "react"
import {
  fetchBatchStudents,
  fetchBatchTeachers,
  fetchAllStudents,
  fetchAllTeachers,
} from "../api"
import toast from "react-hot-toast"


export function useAdminBatchDetails(batchId) {
  const [studentsInBatch, setStudentsInBatch] = useState([])
  const [teachersInBatch, setTeachersInBatch] = useState([])
  const [allStudents, setAllStudents] = useState([])
  const [allTeachers, setAllTeachers] = useState([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function load() {
    try {
      setLoading(true)
      setError(null)

      const [studentsRes, teachersRes, allStudentsRes, allTeachersRes] =
        await Promise.all([
          fetchBatchStudents(batchId),
          fetchBatchTeachers(batchId),
          fetchAllStudents(),
          fetchAllTeachers(),
        ])

      setStudentsInBatch(studentsRes.data.detail.students || [])
      setTeachersInBatch(teachersRes.data.detail.teachers || [])
      setAllStudents(allStudentsRes.data.detail.students || [])
      setAllTeachers(allTeachersRes.data.detail.teachers || [])

    } catch (err) {
      toast.error("Failed to load batch details")
      setError("Failed to load batch details")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (batchId) load()
  }, [batchId])

  return {
    studentsInBatch,
    teachersInBatch,
    allStudents,
    allTeachers,
    loading,
    error,
    setError,
    refresh: load,
  }
}
