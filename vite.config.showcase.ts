import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueDevTools from 'vite-plugin-vue-devtools';


export default defineConfig({
  base: '/athnuikit',
  resolve: {
    alias: {
      '@uikit': fileURLToPath(new URL('./src', import.meta.url)),
    }
  },
  build: {
    outDir: 'showcase-dist',
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  },
  plugins: [
    vue(),
    VueDevTools(),
  ],
})