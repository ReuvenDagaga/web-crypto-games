import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: {}, // מוסיף את אובייקט global עבור תאימות Node.js
  },
  resolve: {
    alias: {
      buffer: 'buffer/', // מגדיר את buffer כמודול מותאם לדפדפן
    },
  },
  optimizeDeps: {
    include: ['buffer'], // מוודא ש-buffer כלול בתלויות
  },
  build: {
    rollupOptions: {
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true, // מפעיל פוליפיל עבור buffer
        }),
        NodeModulesPolyfillPlugin() // מוסיף תמיכה כללית למודולים של Node.js
      ],
    },
  },
})
