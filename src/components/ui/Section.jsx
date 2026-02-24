function Section({ title, children }) {
  return (
    <div
      className="bg-[var(--bg-surface)] border rounded-lg border-slate-200 shadow-sm h-[80vh] p-6"
      style={{
        backgroundColor: "var(--bg-surface)",
      }}
    >
      <h2
        className="text-lg font-medium mb-8"
        style={{ color: "var(--text-main)" }}
      >
        {title}
      </h2>

      {children}
    </div>
  )
}

export default Section
