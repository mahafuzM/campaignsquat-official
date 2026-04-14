import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // যখনই ফ্রন্টএন্ডে '/api' দিয়ে কোনো রিকোয়েস্ট হবে
      "/api": {
        target: "https://api.campaignsquat.com", // সেটি এই ঠিকানায় পাঠিয়ে দাও
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
