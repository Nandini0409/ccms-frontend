import { Outlet, NavLink } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "../lib/axios"
import { DASHBOARD_MENUS } from "../config/dashboardMenus"

function DashboardLayout({ role }) {
  const menu = DASHBOARD_MENUS[role]

  const [me, setMe] = useState(null)
  const [loadingMe, setLoadingMe] = useState(true)

  useEffect(() => {
    async function fetchMe() {
      try {
        setLoadingMe(true)

        const res = await axios.get("/auth/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })

        if (!res.data?.success || !res.data?.detail) {
          throw new Error("Invalid /me response")
        }

        setMe(res.data.detail)
      } catch (err) {
        console.error("Me API error:", err)

        if (err.response?.status === 401) {
          localStorage.removeItem("access_token")
          window.location.href = "/auth/login"
        }
      } finally {
        setLoadingMe(false)
      }
    }

    if (role === "student" || role === "teacher") {
      fetchMe()
    }
  }, [role])

  return (
    <div className="min-h-screen flex bg-[var(--bg-page)]">
      <aside className="w-64 bg-[var(--bg-surface)] border-r border-[var(--border)]">
        <div className="p-4 text-lg font-semibold text-[var(--text-main)]">
          {menu.title}
        </div>

        <nav className="flex flex-col gap-1 px-2">
          {menu.links.map(link => (
            <SidebarLink key={link.to} to={link.to}>
              {link.label}
            </SidebarLink>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-3 pt-0">

        {(role === "student" || role === "teacher") && (
          <header className="sticky top-0 z-10 bg-[var(--bg-surface)] border rounded-lg border-t-0 border-slate-200 rounded-t-none shadow-sm">
            <div className="max-w-6xl mx-auto h-14 px-6 flex items-center justify-between">

              <div className="flex flex-col leading-tight">
                <span className="text-md font-medium text-[var(--text-main)]">
                  {loadingMe ? "Loading..." : me?.name || "User"}
                </span>
                <span className="text-sm text-[var(--text-muted)]">
                  {loadingMe ? "" : me?.email || ""}
                </span>
              </div>

              <button
                className="text-md font-medium text-[var(--primary)] hover:underline"
                onClick={() => {
                  localStorage.removeItem("access_token")
                  window.location.href = "/auth/login"
                }}
              >
                Logout
              </button>

            </div>
          </header>
        )}

        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

function SidebarLink({ to, children }) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `px-3 py-2 rounded text-sm transition
        ${isActive
          ? "bg-[var(--primary)] text-white"
          : "text-[var(--text-muted)] hover:bg-slate-100"
        }`
      }
    >
      {children}
    </NavLink>
  )
}

export default DashboardLayout
