import { AnimatePresence, motion as Motion } from 'framer-motion'
import ProjectCard from './ProjectCard'

function BentoGrid({ projects, onSelectProject }) {
  return (
    <Motion.div
      layout
      className="grid grid-cols-1 gap-3 md:grid-cols-2 md:auto-rows-[260px] lg:grid-cols-4"
    >
      <AnimatePresence mode="popLayout">
        {projects.map((project) => (
          <Motion.div
            layout
            key={project.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            <ProjectCard project={project} onClick={() => onSelectProject(project)} />
          </Motion.div>
        ))}
      </AnimatePresence>
    </Motion.div>
  )
}

export default BentoGrid
