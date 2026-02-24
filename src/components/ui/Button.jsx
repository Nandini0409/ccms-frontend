function Button({
  children,
  className,
  type = "button",
  disabled = false,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`
        w-full
        py-2
        bg-slate-700
        text-white
        rounded
        text-sm
        transition
        hover:bg-slate-800
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
