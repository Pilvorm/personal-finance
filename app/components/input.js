export default function Input({
  label,
  icon,
  error,
  className = "",
  ...props
}) {
  return (
    <div>
      {label && (
        <label className="mb-1 text-xs text-grey-500 font-bold">{label}</label>
      )}
      <div className="btn-basic px-5 py-3 flex items-center gap-3">
        {icon && <span className="text-sm text-beige-500">{icon}</span>}
        <input
          {...props}
          className={`
          w-full outline-none
          ${className}
        `}
        />
      </div>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
