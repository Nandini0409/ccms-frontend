import { Outlet } from "react-router-dom"
import { useState } from "react"

function AuthLayout() {
  const [meta, setMeta] = useState({})

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-page)]">
      <div className="w-full max-w-sm bg-[var(--bg-surface)] p-4 sm:p-6 mx-2 rounded-md border">

        {meta.title && (
          <h1 className="text-2xl font-semibold text-[var(--text-main)] text-center mb-3">
            {meta.title}
          </h1>
        )}

        {meta.description && (
          <p className="text-sm text-center text-[var(--text-muted)] mb-10">
            {meta.description}
          </p>
        )}

        <Outlet context={setMeta} />
      </div>
    </div>
  )
}

export default AuthLayout
