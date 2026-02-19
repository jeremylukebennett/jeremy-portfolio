function ViewportFrame({ children }) {
  return (
    <div className="border border-brand-gray-800 bg-brand-black">
      <div className="flex items-center gap-1 border-b border-brand-gray-800 px-2 py-1">
        <span className="h-2 w-2 bg-brand-gray-400" />
        <span className="h-2 w-2 bg-brand-gray-400" />
        <span className="h-2 w-2 bg-brand-gray-400" />
      </div>

      <div className="overflow-hidden bg-white">{children}</div>
    </div>
  )
}

export default ViewportFrame
