import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            const modules = id.split("node_modules/")[1].split("/")[0];
            return `vendor-${modules}`;
          }
          if (id.includes("src")) {
            const parts = id.split("src/")[1].split("/");
            return parts.length > 1 ? parts[0] : "main";
          }
        },
      },
    },
  },
  plugins: [react()]
})
