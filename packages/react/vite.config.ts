// eslint-disable-next-line unicorn/import-style
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: '@canvas-editor/react',
      formats: ['es', 'umd'],
      fileName: 'index',
    },
    rollupOptions: {
      // 外部化 React 依赖
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
  plugins: [react(), dts({ 
    tsconfigPath: './tsconfig.json',
    exclude: ['vite.config.ts']
  })],
})
