import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '127.0.0.1',
    port: 5173,
    watch: {
      usePolling: false,
      ignored: ['**/public/logoimg.png']
    }
  },
  build: {
    // Raise warning threshold so Spline/Three chunks don't spam the console
    chunkSizeWarningLimit: 2500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('/react/') || id.includes('/react-dom/') || id.includes('/scheduler/')) {
              return 'vendor-react';
            }
            if (id.includes('/framer-motion/') || id.includes('/gsap/') || id.includes('/@studio-freight/lenis/')) {
              return 'vendor-motion';
            }
            if (id.includes('/lucide-react/') || id.includes('/clsx/') || id.includes('/tailwind-merge/')) {
              return 'vendor-ui';
            }
          }
        },
      },
    },
  },
})
