 Editor

基于 Canvas 的富文本编辑器，提供多框架集成支持。

## 特性

- 基于 Canvas 渲染，性能优越
- 支持丰富的文本编辑功能
- 提供 React、Vue 等框架的集成组件
- 轻量级设计，易于扩展

## 项目结构

本项目采用 monorepo 结构，包含以下包：

- `@canvas-editor/core`: 核心编辑器实现
- `@canvas-editor/react`: React 集成组件
- `@canvas-editor/vue`: Vue 集成组件

## 安装

### 核心包

```bash
npm install @canvas-editor/core
```

### React 集成

```bash
npm install @canvas-editor/react
```

### Vue 集成

```bash
npm install @canvas-editor/vue
```

## 使用示例

### 原生 JavaScript

```javascript
import { Editor } from '@canvas-editor/core';

const editor = new Editor({
  container: document.getElementById('editor-container'),
  // 其他配置选项...
});

editor.init();
```

### React

```jsx
import { CanvasEditor } from '@canvas-editor/react';

function App() {
  const handleReady = (editor) => {
    console.log('Editor is ready', editor);
  };

  return (
    <CanvasEditor 
      onReady={handleReady}
      style={{ height: '500px' }}
    />
  );
}
```

### Vue

```vue
<template>
  <CanvasEditor 
    :options="editorOptions"
    @ready="handleReady"
    height="500px"
  />
</template>

<script>
import { CanvasEditor } from '@canvas-editor/vue';

export default {
  components: { CanvasEditor },
  data() {
    return {
      editorOptions: {
        // 编辑器配置选项...
      }
    };
  },
  methods: {
    handleReady(editor) {
      console.log('Editor is ready', editor);
    }
  }
};
</script>
```

## 开发

### 安装依赖

```bash
pnpm install
```

### 构建所有包

```bash
pnpm build
```

### 开发模式

```bash
pnpm dev
```

## 许可证

ISC
 Editor

基于 Canvas 的富文