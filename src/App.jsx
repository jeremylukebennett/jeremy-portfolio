import { useMemo, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion as Motion } from 'framer-motion'
import Header from './components/Header'
import Footer from './components/Footer'
import CategoryFilter from './components/CategoryFilter'
import BentoGrid from './components/BentoGrid'
import ProjectModal from './components/ProjectModal'
import projects from './data/projects'

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'web', label: 'Web' },
  { id: 'email', label: 'Email' },
  { id: 'tool', label: 'Tools' },
  { id: 'component', label: 'Components' },
]

function App() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') {
      return projects
    }

    return projects.filter((project) => project.category === activeCategory)
  }, [activeCategory])

  return (
    <div className="min-h-screen bg-brand-black text-brand-white">
      <Header />

      <main className="mx-auto w-full max-w-[1500px] px-4 pb-10 pt-6 md:px-6 lg:px-8">
        <CategoryFilter
          filters={FILTERS}
          activeCategory={activeCategory}
          onChange={setActiveCategory}
        />

        <LayoutGroup id="project-layout">
          <Motion.div
            animate={{ opacity: selectedProject ? 0.25 : 1 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className={selectedProject ? 'pointer-events-none' : ''}
          >
            <BentoGrid projects={filteredProjects} onSelectProject={setSelectedProject} />
          </Motion.div>

          <AnimatePresence>
            {selectedProject ? (
              <ProjectModal
                project={selectedProject}
                onClose={() => setSelectedProject(null)}
              />
            ) : null}
          </AnimatePresence>
        </LayoutGroup>
      </main>

      <Footer />
    </div>
  )
}

export default App
