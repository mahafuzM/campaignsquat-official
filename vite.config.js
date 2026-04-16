import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Matches any request starting with /api
      "/api": {
        // Change this to your actual backend server port
        target: "http://localhost:5000", 
        changeOrigin: true,
        secure: false,
        // Optional: removes /api from the path before sending to backend
        // rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  build: {
    // Optimization for those large chunks we saw in your build log
    rollupOptions: {
      output: {
        manualChunks: {
          "lucide-vendor": ["lucide-react"],
          "react-vendor": ["react", "react-dom", "react-router-dom"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});