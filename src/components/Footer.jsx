function Footer() {
  return (
    <footer className="border-t border-brand-gray-800">
      <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-4 px-4 py-6 md:flex-row md:items-center md:justify-between md:px-6 lg:px-8">
        <p className="text-sm font-semibold tracking-tdr text-brand-gray-400">
          Contact
          <span className="ml-2 text-brand-white">jeremy@example.com</span>
        </p>

        <div className="flex flex-wrap gap-2">
          <a
            className="border border-brand-gray-400 px-3 py-2 text-xs font-semibold tracking-tdr text-brand-gray-400 transition-colors duration-150 ease-out hover:border-brand-yellow hover:bg-brand-yellow hover:text-black"
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a
            className="border border-brand-gray-400 px-3 py-2 text-xs font-semibold tracking-tdr text-brand-gray-400 transition-colors duration-150 ease-out hover:border-brand-yellow hover:bg-brand-yellow hover:text-black"
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <a
            className="border border-brand-gray-400 px-3 py-2 text-xs font-semibold tracking-tdr text-brand-gray-400 transition-colors duration-150 ease-out hover:border-brand-yellow hover:bg-brand-yellow hover:text-black"
            href="mailto:jeremy@example.com"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
