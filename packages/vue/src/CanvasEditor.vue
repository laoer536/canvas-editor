<template>
  <div ref="containerRef" :class="className" :style="containerStyle" />
</template>

<script lang="ts" setup>
import {
  ref,
  onMounted,
  onBeforeUnmount,
  computed,
} from 'vue'
import { Editor, EditorOptions } from '@canvas-editor/core'

interface CanvasEditorProps {
  width?: number | string
  height?: number | string
  options?: Omit<EditorOptions, 'container'>
  className?: string
}

const props = withDefaults(defineProps<CanvasEditorProps>(), {
  width: '100%',
  height: '100%',
  options: () => ({}),
  className: '',
})

const emit = defineEmits(['ready', 'change'])

const containerRef = ref<HTMLElement | null>(null)
const editor = ref<Editor | null>(null)

const containerStyle = computed(() => {
  return {
    width:
      typeof props.width === 'number' ? `${props.width}px` : props.width,
    height:
      typeof props.height === 'number' ? `${props.height}px` : props.height,
  }
})

onMounted(() => {
  if (!containerRef.value) return

  const editorInstance = new Editor({
    container: containerRef.value,
    ...props.options,
  })

  editorInstance.init()
  editor.value = editorInstance

  emit('ready', editorInstance)
})

onBeforeUnmount(() => {
  // 清理逻辑，如果需要的话
})
</script>
