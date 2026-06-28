import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/jobs": "http://localhost:5000",
      "/my-jobs": "http://localhost:5000",
      "/jobApplication": "http://localhost:5000",
      "/job-applications": "http://localhost:5000",
      "/users": "http://localhost:5000",
      "/notifications": "http://localhost:5000",
      "/uploads": "http://localhost:5000",
    },
  },
})
