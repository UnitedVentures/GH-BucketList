import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Relative base so the build works when hosted under a sub-path
  // (e.g. GitHub Pages at /BucketList/).
  base: './',
  plugins: [react()],
})
