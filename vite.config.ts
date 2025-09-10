import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { mockDevServerPlugin } from 'vite-plugin-mock-dev-server'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), mockDevServerPlugin({
    prefix: '/mock',
    exclude: ['/api/**'],
  })],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  server: {
    cors: true,
    proxy: {
      '/mock': {
        target: 'http://localhost:5173/',
        changeOrigin: true,
      },
    },
  },
})
