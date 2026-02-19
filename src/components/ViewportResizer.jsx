import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { motion as Motion } from 'framer-motion'
import ViewportFrame from './ViewportFrame'
import DragHandle from './DragHandle'

const MIN_VIEWPORT_WIDTH = 320
const PRESETS = [
  { id: 'desktop', label: 'Desktop', width: 1280 },
  { id: 'tablet', label: 'Tablet', width: 768 },
  { id: 'mobile', label: 'Mobile', width: 375 },
]

function ViewportResizer({ project }) {
  const canvasRef = useRef(null)
  const [maxWidth, setMaxWidth] = useState(1280)
  const [viewportWidth, setViewportWidth] = useState(1280)
  const [isDragging, setIsDragging] = useState(false)
  const [isMobileScreen, setIsMobileScreen] = useState(() => {
    if (typeof window === 'undefined') {
      return false
    }

    return window.innerWidth < 768
  })

  const isResizable =
    project.supportsResponsivePreview &&
    (project.content.type === 'iframe' || project.content.type === 'component')

  const clampWidth = useCallback(
    (value) => {
      const upperBound = Math.max(MIN_VIEWPORT_WIDTH, maxWidth)
      return Math.min(upperBound, Math.max(MIN_VIEWPORT_WIDTH, Math.round(value)))
    },
    [maxWidth],
  )

  useEffect(() => {
    const handleResize = () => {
      setIsMobileScreen(window.innerWidth < 768)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const currentCanvas = canvasRef.current

    if (!currentCanvas) {
      return undefined
    }

    const observer = new ResizeObserver((entries) => {
      const measuredWidth = entries[0]?.contentRect.width ?? 0
      const nextMax = Math.max(MIN_VIEWPORT_WIDTH, Math.floor(measuredWidth - 2))
      setMaxWidth(nextMax)
    })

    observer.observe(currentCanvas)

    return () => observer.disconnect()
  }, [])

  const frameWidth = isResizable ? clampWidth(viewportWidth) : Math.min(maxWidth, 1280)

  const handlePresetClick = (width) => {
    setViewportWidth(clampWidth(width))
  }

  const startDragging = (event) => {
    if (!isResizable || isMobileScreen) {
      return
    }

    event.preventDefault()

    const startX = event.clientX
    const startWidth = frameWidth

    setIsDragging(true)
    document.body.style.cursor = 'ew-resize'
    document.body.style.userSelect = 'none'

    const handlePointerMove = (moveEvent) => {
      const delta = moveEvent.clientX - startX
      setViewportWidth(clampWidth(startWidth + delta))
    }

    const stopDragging = () => {
      setIsDragging(false)
      document.body.style.removeProperty('cursor')
      document.body.style.removeProperty('user-select')
      window.removeEventListener('pointermove', handlePointerMove)
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', stopDragging, { once: true })
  }

  const contentNode = useMemo(() => {
    if (project.content.type === 'iframe') {
      return (
        <iframe
          title={`${project.title} live preview`}
          src={project.content.src}
          className="h-[460px] w-full border-0 bg-white md:h-[560px]"
          loading="lazy"
        />
      )
    }

    if (project.content.type === 'component') {
      const ProjectComponent = project.content.component

      return (
        <div className="min-h-[460px] bg-white p-4 text-black md:min-h-[560px] md:p-6">
          <ProjectComponent />
        </div>
      )
    }

    return (
      <div className="flex min-h-[380px] flex-col items-center justify-center gap-6 bg-brand-black p-6 text-center">
        <img
          src={project.thumbnail}
          alt={`${project.title} preview`}
          className="h-auto w-full max-w-[780px] border border-brand-gray-800"
        />
        <a
          href={project.content.url}
          target="_blank"
          rel="noreferrer"
          className="border border-brand-yellow bg-brand-yellow px-4 py-2 text-sm font-semibold tracking-tdr text-black transition-colors duration-150 ease-out hover:bg-transparent hover:text-brand-yellow"
        >
          Open In New Tab
        </a>
      </div>
    )
  }, [project])

  return (
    <section>
      {isResizable ? (
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {PRESETS.map((preset) => {
            const presetWidth = clampWidth(preset.width)
            const isActive = frameWidth === presetWidth

            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => handlePresetClick(preset.width)}
                className={`flex items-center gap-2 border px-3 py-2 text-xs font-semibold tracking-tdr transition-colors duration-150 ease-out ${
                  isActive
                    ? 'border-brand-yellow bg-brand-yellow text-black'
                    : 'border-brand-gray-400 text-brand-gray-400 hover:border-brand-yellow hover:text-brand-yellow'
                }`}
                aria-label={`Set viewport to ${preset.label}`}
              >
                <span className="inline-block h-3 w-4 border border-current" />
                {preset.label}
              </button>
            )
          })}

          <span className="ml-auto border border-brand-gray-800 px-3 py-2 font-mono text-xs font-semibold text-brand-green">
            {frameWidth}px
          </span>
        </div>
      ) : null}

      <div
        ref={canvasRef}
        className="relative w-full overflow-x-auto border border-brand-gray-800 bg-brand-black/80 p-2 md:p-5"
      >
        <div className="flex min-h-[420px] w-full justify-center">
          <Motion.div
            className="relative shrink-0"
            style={{ width: `${frameWidth}px` }}
            animate={{ width: frameWidth }}
            transition={{ duration: isDragging ? 0 : 0.2, ease: 'easeOut' }}
          >
            <ViewportFrame>{contentNode}</ViewportFrame>
            {isResizable && !isMobileScreen ? <DragHandle onPointerDown={startDragging} /> : null}
          </Motion.div>
        </div>
      </div>
    </section>
  )
}

export default ViewportResizer
