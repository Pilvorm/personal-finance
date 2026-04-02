export default function PageHeader({ title, action, fn }) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="page-title">{title}</h1>
      {action && (
        <button onClick={fn} className="hover-invert cursor-pointer p-4 bg-grey-900 rounded-lg text-white text-sm font-bold">
          {action}
        </button>
      )}
    </div>
  );
}
