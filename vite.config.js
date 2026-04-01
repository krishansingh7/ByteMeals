import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api/swiggy': {
        target: 'https://www.swiggy.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/swiggy/, ''),
        headers: {
          'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
          'Origin': 'https://www.swiggy.com',
          'Referer': 'https://www.swiggy.com/',
        }
      }
    }
  }
})
