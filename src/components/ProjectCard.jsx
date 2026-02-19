import { motion as Motion } from 'framer-motion'

const CARD_SIZE_CLASSES = {
  standard: 'col-span-1 row-span-1 min-h-[260px]',
  wide: 'col-span-1 row-span-1 min-h-[260px] md:col-span-2',
  tall: 'col-span-1 row-span-1 min-h-[260px] md:row-span-2 md:min-h-[540px]',
  large: 'col-span-1 row-span-1 min-h-[260px] md:col-span-2 md:row-span-2 md:min-h-[540px]',
}

function ProjectCard({ project, onClick }) {
  return (
    <Motion.button
      layoutId={`project-card-${project.id}`}
      type="button"
      onClick={onClick}
      className={`group relative h-full w-full overflow-hidden border border-brand-gray-800 bg-brand-gray-900 text-left transition-colors duration-150 ease-out hover:border-brand-yellow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow ${CARD_SIZE_CLASSES[project.cardSize] || CARD_SIZE_CLASSES.standard}`}
      aria-label={`Open ${project.title}`}
    >
      <img
        src={project.thumbnail}
        alt={project.title}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/20 transition-colors duration-150 ease-out group-hover:bg-transparent" />

      <div className="absolute bottom-0 left-0 right-0 bg-black/90 px-4 py-3 transition-colors duration-150 ease-out group-hover:bg-brand-yellow">
        <h2 className="text-2xl font-semibold tracking-tdrtight text-brand-white transition-colors duration-150 ease-out group-hover:text-black md:text-3xl">
          {project.title}
        </h2>
        <p className="mt-1 text-xs font-semibold tracking-tdr text-brand-gray-400 transition-colors duration-150 ease-out group-hover:text-black md:text-sm">
          {project.subtitle}
        </p>
      </div>
    </Motion.button>
  )
}

export default ProjectCard
