import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueDevTools from 'vite-plugin-vue-devtools';


export default defineConfig({
  base: '/athnuikit',
  plugins: [
    vue(),
    VueDevTools(),
  ],
  resolve: {
    alias: {
      '@uikit': fileURLToPath(new URL('./src', import.meta.url)),
    }
  },
  build: {
    outDir: 'dist',
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      formats: ['es'],
      fileName: 'index',
      name: 'vuikit',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        }
      }
    }
  }
})