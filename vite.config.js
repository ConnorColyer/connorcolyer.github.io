import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // If deploying to a project repo, change to "/REPO_NAME/".
  // If deploying to connorcolyer.github.io (user site repo), keep "/".
  base: "/"
});
