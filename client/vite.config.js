import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path, { fileURLToPath } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'src'),
			'~': path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'node_modules')
		}
	}
})
