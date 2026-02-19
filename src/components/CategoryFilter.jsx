import { motion as Motion } from 'framer-motion'

function CategoryFilter({ filters, activeCategory, onChange }) {
  return (
    <div className="mb-5 flex flex-wrap gap-2 md:mb-6">
      {filters.map((filter) => {
        const isActive = filter.id === activeCategory

        return (
          <button
            key={filter.id}
            type="button"
            onClick={() => onChange(filter.id)}
            className={`relative overflow-hidden border px-4 py-2 text-xs font-semibold tracking-tdr transition-colors duration-150 ease-out md:text-sm ${
              isActive
                ? 'border-brand-yellow text-black'
                : 'border-brand-gray-400 text-brand-gray-400 hover:border-brand-yellow hover:text-brand-yellow'
            }`}
            aria-pressed={isActive}
          >
            {isActive ? (
              <Motion.span
                layoutId="active-filter-pill"
                className="absolute inset-0 bg-brand-yellow"
                transition={{ duration: 0.18, ease: 'easeOut' }}
              />
            ) : null}
            <span className="relative z-10">{filter.label}</span>
          </button>
        )
      })}
    </div>
  )
}

export default CategoryFilter
