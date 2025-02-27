import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: {},
  },
  resolve: {
    alias: {
      buffer: 'buffer/', 
    },
  },
  optimizeDeps: {
    include: ['buffer'], 
  },
  build: {
    rollupOptions: {
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true, 
        }),
        NodeModulesPolyfillPlugin() 
      ],
    },
  },
})
