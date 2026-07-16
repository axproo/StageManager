import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@router": path.resolve(__dirname, "src/router"),
      "@stores": path.resolve(__dirname, "src/stores"),
      "@pages": path.resolve(__dirname, "src/pages"),
    },
  },
  plugins: [vue(), tailwindcss()],
});
