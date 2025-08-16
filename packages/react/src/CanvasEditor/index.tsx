import type { EditorOptions } from '@canvas-editor/core'
import { Editor } from '@canvas-editor/core'
import React, { useEffect, useRef, useState } from 'react'

/**
 * React Canvas Editor 组件属性
 */
export interface CanvasEditorProps extends Omit<EditorOptions, 'container'> {
  /**
   * 编辑器内容变化时的回调
   */
  onChange?: (content: any) => void

  /**
   * 编辑器就绪时的回调
   */
  onReady?: (editor: Editor) => void

  /**
   * 自定义类名
   */
  className?: string

  /**
   * 自定义样式
   */
  style?: React.CSSProperties
}

/**
 * React Canvas Editor 组件
 */
export const CanvasEditor: React.FC<CanvasEditorProps> = ({
  onChange,
  onReady,
  className,
  style,
  ...options
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [editor, setEditor] = useState<Editor | null>(null)
  console.log('editor', editor)

  useEffect(() => {
    if (!containerRef.current) return

    const editorInstance = new Editor({
      container: containerRef.current,
      ...options,
    })

    editorInstance.init()
    setEditor(editorInstance)

    if (onReady) {
      onReady(editorInstance)
    }

    return () => {
      // 清理逻辑，如果需要的话
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        width: '100%',
        height: '100%',
        ...style,
      }}
    />
  )
}
