import { useEffect, useRef } from 'react'
import { motion as Motion } from 'framer-motion'
import ViewportResizer from './ViewportResizer'

const FOCUSABLE_ELEMENTS =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

function ProjectModal({ project, onClose }) {
  const modalRef = useRef(null)
  const toCamelCaseLabel = (value) =>
    value
      .split(/[-_\s]+/)
      .filter(Boolean)
      .map((part) => `${part[0]?.toUpperCase() || ''}${part.slice(1).toLowerCase()}`)
      .join('')

  useEffect(() => {
    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    modalRef.current?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab' || !modalRef.current) {
        return
      }

      const focusable = modalRef.current.querySelectorAll(FOCUSABLE_ELEMENTS)

      if (!focusable.length) {
        event.preventDefault()
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow

      if (previousFocus instanceof HTMLElement) {
        previousFocus.focus()
      }
    }
  }, [onClose])

  return (
    <Motion.div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/85 p-2 md:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
    >
      <Motion.article
        ref={modalRef}
        layoutId={`project-card-${project.id}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`project-title-${project.id}`}
        tabIndex={-1}
        className="flex h-full max-h-[96vh] w-full max-w-[1440px] flex-col overflow-hidden border border-brand-gray-800 bg-brand-gray-900"
      >
        <header className="border-b border-brand-gray-800 p-4 md:p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2
                id={`project-title-${project.id}`}
                className="text-2xl font-semibold tracking-tdrtight text-brand-white md:text-3xl"
              >
                {project.title}
              </h2>
              <p className="mt-1 text-sm font-semibold tracking-tdr text-brand-gray-400 md:text-base">
                {project.subtitle}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="border border-brand-gray-400 px-4 py-2 text-xs font-semibold tracking-tdr text-brand-gray-400 transition-colors duration-150 ease-out hover:border-brand-yellow hover:bg-brand-yellow hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow"
              aria-label="Close project preview"
            >
              <span aria-hidden="true">X</span>
            </button>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="border border-brand-pink bg-brand-pink px-2 py-1 text-[11px] font-semibold tracking-tdr text-brand-white"
              >
                {toCamelCaseLabel(tag)}
              </span>
            ))}
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <ViewportResizer key={project.id} project={project} />

          <section className="mt-5 border border-brand-gray-800 p-4 md:p-5">
            <h3 className="text-sm font-semibold tracking-tdr text-brand-gray-400">
              Context
            </h3>
            <p className="mt-2 max-w-[90ch] text-sm leading-snugger text-brand-white md:text-base">
              {project.description}
            </p>
          </section>
        </div>
      </Motion.article>
    </Motion.div>
  )
}

export default ProjectModal
