import { defineConfig, type UserConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
  },
  globals: true,
  setupFiles: "./tests/setup.js",
} as UserConfig);
