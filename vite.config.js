import { resolve } from "node:path";
import { defineConfig } from "vite";

const root = process.cwd();

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        home: resolve(root, "index.html"),
        webDevelopment: resolve(root, "services/web-development/index.html"),
        aiAutomation: resolve(root, "services/ai-automation/index.html"),
        aiAssistants: resolve(root, "services/ai-assistants/index.html"),
        localSeo: resolve(root, "services/google-business-profile-seo/index.html"),
      },
    },
  },
});
