import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

const r = (...args: string[]) => resolve(__dirname, '.', ...args)

// bundling the content script
export default defineConfig({
  root: r('src'),
  plugins: [
    vue()
  ],
  build: {
    watch: {},
    cssCodeSplit: false,
    emptyOutDir: false,
    sourcemap: false,
    outDir: r('dist/background'),
    rollupOptions: {
      input: {
        index: r('src/background/index.ts'),
      },
      output: {
        entryFileNames:"[name].js",
        format: "iife",
        inlineDynamicImports: false
      },
    },
  }
})