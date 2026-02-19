import { useState } from 'react'

const NAME_TEXT = 'JeremyBennett'
const LETTER_COLORS = [
  '#FFD600',
  '#E91E90',
  '#00E676',
  '#00A3FF',
  '#FF5E00',
  '#9D4DFF',
  '#F5F5F5',
]

function Header() {
  const [hoveredLetterIndex, setHoveredLetterIndex] = useState(null)

  return (
    <header className="border-b border-brand-gray-800">
      <div className="mx-auto flex w-full max-w-[1500px] items-end justify-between gap-4 px-4 py-5 md:px-6 lg:px-8">
        <div>
          <h1
            className="inline-block whitespace-pre text-5xl font-semibold tracking-tdrtight md:text-7xl"
            onPointerLeave={() => setHoveredLetterIndex(null)}
          >
            {NAME_TEXT.split('').map((letter, index) => {
              const isActive = hoveredLetterIndex === index

              return (
                <span
                  key={`${letter}-${index}`}
                  className={`name-letter inline-block ${isActive ? 'name-letter-active' : ''}`}
                  onPointerEnter={() => setHoveredLetterIndex(index)}
                  style={
                    isActive
                      ? {
                          '--letter-color': LETTER_COLORS[index % LETTER_COLORS.length],
                          animationDuration: `${150 + ((index * 53) % 110)}ms`,
                        }
                      : undefined
                  }
                >
                  {letter}
                </span>
              )
            })}
          </h1>
          <p className="mt-2 max-w-[42rem] text-sm font-semibold tracking-tdr text-brand-gray-400 md:text-base">
            Front-End Web Developer · Digital Marketing · UX/UI Designer
          </p>
        </div>

        <p className="hidden border border-brand-gray-800 px-3 py-2 text-xs font-semibold tracking-tdr text-brand-gray-400 md:block">
          Interactive Portfolio / Live Work
        </p>
      </div>
    </header>
  )
}

export default Header
