import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Default to user-site root; override in CI for project pages.
  base: process.env.VITE_BASE ?? "/"
});
