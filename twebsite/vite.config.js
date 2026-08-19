import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 8080,
    allowedHosts: [
      'threatheck-cph7dhbqcghxbgct.canadacentral-01.azurewebsites.net',
    ],
  },
})
