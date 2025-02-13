import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  server:{
    proxy: {
      '/qr-factorization': {
        target: 'http://localhost:4000/api/', // URL de la API 1
        changeOrigin: true,
      },
      '/matrix-stats': {
        target: 'http://localhost:3001/api/', // URL de la API 2
        changeOrigin: true,
      },
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
