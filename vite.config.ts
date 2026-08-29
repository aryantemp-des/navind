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
        manualChunks: {
          // React core — tiny, always needed
          'vendor-react': ['react', 'react-dom'],
          // Animation libraries
          'vendor-motion': ['framer-motion', 'gsap'],
          // Heavy 3-D / WebGL — lazy loaded by Spline
          'vendor-three': ['three'],
          // UI utilities
          'vendor-ui': ['lucide-react', 'clsx', 'tailwind-merge'],
        },
      },
    },
  },
})
