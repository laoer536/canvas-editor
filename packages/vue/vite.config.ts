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
      // 外部化 React 依赖
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
      tsconfigPath: './tsconfig.json',
      exclude: ['vite.config.ts'],
    }),
  ],
})
