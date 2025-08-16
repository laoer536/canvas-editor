import url from 'node:url'
import path from 'path'

import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: '@canvas-editor/core',
      formats: ['es', 'umd'],
      fileName: 'index',
    },
    rollupOptions: {},
  },
  plugins: [dts({ 
    tsconfigPath: './tsconfig.json',
    exclude: ['vite.config.ts']
  })],
})
