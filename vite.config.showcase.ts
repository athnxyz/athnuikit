import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueDevTools from 'vite-plugin-vue-devtools';


export default defineConfig({
  base: '/vuikit',
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
    outDir: 'showcase-dist', // Specify the output directory for the showcase build
    rollupOptions: {
      input: {
        main: 'src/main.ts', // Adjust the path to your showcase entry point
      }
    }
  }
})