import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { env } from 'node:process'

const repositoryName = env.GITHUB_REPOSITORY?.split('/')[1]
const isGitHubActions = env.GITHUB_ACTIONS === 'true'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: isGitHubActions && repositoryName ? `/${repositoryName}/` : '/',
})
