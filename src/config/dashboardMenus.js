export const DASHBOARD_MENUS = {
  admin: {
    title: "Admin Panel",
    links: [
      { to: "/admin", label: "Home" },
      { to: "/admin/students", label: "Students" },
      { to: "/admin/teachers", label: "Teachers" },
      { to: "/admin/batches", label: "Batches" },
      { to: "/admin/fees", label: "Fees" },
      { to: "/admin/payments", label: "Payments" },
    ],
  },
  student: {
    title: "Student Panel",
    links: [
      { to: "/student", label: "Home" },
      { to: "/student/batches", label: "Batches" },
    ],
  },
  teacher: {
    title: "Teacher Panel",
    links: [
      { to: "/teacher/batches", label: "Batches" },
      // { to: "/teacher/attendance", label: "Attendance" },
    ],
  },
}
