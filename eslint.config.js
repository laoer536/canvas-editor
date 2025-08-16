// @ts-check
import pluginImportX from 'eslint-plugin-import-x'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import pluginUnicorn from 'eslint-plugin-unicorn'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  // 基础忽略配置
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      '**/*.snap',
      '**/coverage/**',
      '**/temp/**',
      'packages/**/public/**',
      'packages/**/*.d.ts',
    ],
  },

  // TypeScript 核心规则 (替代 @eslint/js)
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,

  // Unicorn 插件配置
  {
    plugins: {
      unicorn: pluginUnicorn,
    },
    rules: {
      ...pluginUnicorn.configs['flat/recommended'].rules,
      // 浏览器项目特定调整
      'unicorn/filename-case': [
        'error',
        {
          cases: {
            camelCase: true,
            pascalCase: true,
          },
          ignore: [
            '\\.(spec|test|stories)\\.tsx?$', // 忽略测试文件
          ],
        },
      ],
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/no-null': 'off',
      'unicorn/prefer-node-protocol': 'off', // 浏览器不需要 node: 协议
      'unicorn/no-process-exit': 'off', // 浏览器没有 process.exit
    },
  },

  // 导入规则配置
  {
    plugins: {
      'import-x': pluginImportX,
    },
    rules: {
      'import-x/no-duplicates': 'error',
      'import-x/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'import-x/no-absolute-path': 'error',
    },
  },

  // 通用浏览器配置
  {
    name: 'global',
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
        project: true,
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.es2022,
      },
    },
    rules: {
      // 核心规则
      'no-debugger': 'error',
      'no-alert': 'warn',
      'no-console': ['warn', { allow: ['warn', 'error'] }],

      // TypeScript 规则
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/ban-ts-comment': [
        'error',
        { 'ts-ignore': 'allow-with-description' },
      ],

      // 浏览器安全规则
      'no-restricted-globals': [
        'error',
        {
          name: 'event',
          message: '使用局部事件对象代替全局event',
        },
        {
          name: 'name',
          message: '避免使用全局name变量',
        },
      ],

      // 浏览器环境特定规则
      'no-restricted-syntax': [
        'error',
        {
          selector: 'CallExpression[callee.name="require"]',
          message: '浏览器环境请使用 ES 模块导入语法',
        },
      ],
    },
  },

  // ==================== React 包配置 ====================
  {
    name: 'react-lib',
    files: ['packages/react/**/*.{ts,tsx}'],
    plugins: {
      react: pluginReact,
      'react-hooks': pluginReactHooks,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react/jsx-uses-vars': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/self-closing-comp': [
        'error',
        {
          component: true,
          html: true,
        },
      ],

      // Unicorn 规则调整
      'unicorn/prefer-query-selector': 'off',
      'unicorn/no-document-cookie': 'off',
      'unicorn/prefer-dom-node-text-content': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },

  // ==================== Vue 包配置 ====================
  {
    name: 'vue-lib',
    files: ['packages/vue/**/*.{vue,ts}'],
    plugins: {
      vue: pluginVue,
    },
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
    rules: {
      ...pluginVue.configs['flat/recommended'],
      'vue/multi-word-component-names': 'off',
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'always',
            normal: 'always',
            component: 'always',
          },
        },
      ],
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],

      // Vue 特定的规则调整
      'unicorn/prefer-dom-node-append': 'off',
      'unicorn/prefer-dom-node-remove': 'off',
      'unicorn/prefer-dom-node-dataset': 'off',
    },
  },

  // ==================== 纯 TS 库配置 ====================
  {
    name: 'core-lib',
    files: ['packages/core/**/*.ts'],
    rules: {
      // 纯 TS 库特定规则
      '@typescript-eslint/no-namespace': 'off',
      'import-x/no-nodejs-modules': 'error',
    },
  },

  // ==================== 测试文件配置 ====================
  {
    name: 'test-files',
    files: [
      '**/__tests__/**/*.{ts,tsx}',
      '**/*.spec.{ts,tsx}',
      '**/*.test.{ts,tsx}',
    ],
    rules: {
      'no-console': 'off',
      'import-x/no-default-export': 'off',
      'unicorn/consistent-function-scoping': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      'no-restricted-globals': 'off',
    },
  },

  // ==================== 配置文件配置 ====================
  {
    name: 'config-files',
    files: ['**/*.config.ts', '**/vite.config.ts', '**/vitest.config.ts'],
    rules: {
      'import-x/no-default-export': 'off',
      'unicorn/prefer-top-level-await': 'off',
      'no-console': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      // 允许在配置文件中使用 Node.js 模块
      'import/no-nodejs-modules': 'off',
      'import-x/no-nodejs-modules': 'off',
    },
  },

  // ==================== 类型声明文件配置 ====================
  {
    name: 'type-files',
    files: ['**/*.d.{ts,cts,mts}'],
    rules: {
      '@typescript-eslint/triple-slash-reference': 'off',
      'import-x/no-duplicates': 'off',
      'unicorn/prefer-export-from': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'import-x/no-nodejs-modules': 'off',
    },
  },

  // ==================== 全局禁用类型检查 ====================
  {
    name: 'no-typechecking',
    files: [
      '**/*.js',
      '**/*.mjs',
      '**/*.cjs',
      '**/__tests__/**',
      'docs/**',
      'playground/**',
      'scripts/**',
      '*.config.ts',
    ],
    languageOptions: {
      parserOptions: {
        project: false,
      },
    },
  },
)
