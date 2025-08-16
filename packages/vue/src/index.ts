import type { App, Plugin } from 'vue'

import CanvasEditor from './CanvasEditor.vue'

export { CanvasEditor }

const CanvasEditorLibrary: Plugin = {
  install(app: App) {
    app.component('CanvasEditor', CanvasEditor)
  },
}

export default CanvasEditorLibrary
