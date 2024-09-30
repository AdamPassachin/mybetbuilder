import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // If you're using React

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Remove the css configuration for Tailwind
})
