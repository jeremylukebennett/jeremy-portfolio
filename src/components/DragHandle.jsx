function DragHandle({ onPointerDown }) {
  return (
    <button
      type="button"
      onPointerDown={onPointerDown}
      aria-label="Drag to resize viewport"
      className="absolute right-0 top-0 h-full w-5 translate-x-1/2 cursor-ew-resize bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow"
    >
      <span className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col gap-1">
        <span className="h-1 w-1 bg-brand-gray-400" />
        <span className="h-1 w-1 bg-brand-gray-400" />
        <span className="h-1 w-1 bg-brand-gray-400" />
      </span>
    </button>
  )
}

export default DragHandle
