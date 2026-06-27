import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          // Three.js + fiber + postprocessing is a large dependency
          // by nature; it's split into its own chunk and lazy-loaded
          // only when the Hero mounts, so it never blocks first paint.
          three: ["three", "@react-three/fiber", "@react-three/postprocessing", "postprocessing"],
        },
      },
    },
    // Raised deliberately — the three.js chunk above is expected to
    // exceed the default 500kB limit; it's lazy-loaded, not part of
    // the critical path.
    chunkSizeWarningLimit: 1000,
  },
});
