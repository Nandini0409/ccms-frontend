function Input({ className = "", ...props }) {
  return (
    <input
      {...props}
      className={`
        w-full
        border border-[var(--border)]
        rounded
        px-3 py-2
        text-sm
        focus:outline-none
        focus:ring-1
        focus:ring-slate-400
        ${className}
      `}
    />
  );
}

export default Input
