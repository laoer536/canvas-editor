import path from 'path'
import url from 'url'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: '@canvas-editor/vue',
      formats: ['es', 'umd'],
      fileName: 'index',
    },
    rollupOptions: {
      external: ['vue', '@canvas-editor/core'],
      output: {
        globals: {
          vue: 'Vue',
          '@canvas-editor/core': 'CanvasEditorCore',
        },
        exports: 'named',
      },
    },
  },
  plugins: [
    vue(),
    dts({
      tsconfigPath: './tsconfig.json',
      exclude: ['vite.config.ts'],
    }),
  ],
})
