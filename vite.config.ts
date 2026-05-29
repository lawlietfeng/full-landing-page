import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/full-landing-page/',
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // react is statically pulled into antd's chunk, so grouping them
          // avoids an empty react chunk while still isolating the heavy
          // antd vendor bundle from app code for long-term caching.
          antd: ['react', 'react-dom', 'antd', '@ant-design/icons'],
          motion: ['framer-motion'],
        },
      },
    },
  },
})
