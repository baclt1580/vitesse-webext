/// <reference types="vitest" />

import { dirname, relative } from 'node:path'
import type { UserConfig } from 'vite'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { isDev, port, r } from './scripts/utils'
import packageJson from './package.json'
import tailwindcss from "tailwindcss";
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import postCssPxToRem from "postcss-pxtorem"
import autoprefixer from 'autoprefixer'

export const sharedConfig: UserConfig = {
  root: r('src'),
  resolve: {
    alias: {
      '~/': `${r('src')}/`,
    },
  },
  define: {
    __DEV__: isDev,
    __NAME__: JSON.stringify(packageJson.name),
  },
  plugins: [
    Vue(),
    AutoImport({
      imports: [
        'vue',
        {
          'webextension-polyfill': [
            ['default', 'browser'],
          ],
          'naive-ui': [
            'useDialog',
            'useMessage',
            'useNotification',
            'useLoadingBar'
          ]
        },
      ],
      dts: r('src/auto-imports.d.ts'),
    }),

    // https://github.com/antfu/unplugin-vue-components
    Components({
      dirs: [r('src/components')],
      // generate `components.d.ts` for ts support with Volar
      dts: r('src/components.d.ts'),
      resolvers: [
        // auto import icons
        IconsResolver({
          prefix: '',
        }),
        NaiveUiResolver()
      ],
    }),

    // https://github.com/antfu/unplugin-icons
    Icons(),
    // rewrite assets to use relative path
    {
      name: 'assets-rewrite',
      enforce: 'post',
      apply: 'build',
      transformIndexHtml(html, { path }) {
        return html.replace(/"\/assets\//g, `"${relative(dirname(path), '/assets')}/`)
      },
    },
  ],
  css: {
    postcss: {
      plugins: [
        tailwindcss(),
        // postCssPxToRem({
        //   rootValue: 16, // 1rem的大小
        //   propList: ['*'], // 需要转换的属性，这里选择全部都进行转换
        //   replace: true,
        //   mediaQuery: false,
        //   minPixelValue: 4,
        //   exclude: /node_modules|initRemW|initRemH/i,
        // }),
        autoprefixer()
      ],
    }
  },
  optimizeDeps: {
    include: [
      'vue',
      '@vueuse/core',
      'webextension-polyfill',
    ],
    exclude: [
      'vue-demi',
    ],
  },
}

export default defineConfig(({ command }) => ({
  ...sharedConfig,
  base: command === 'serve' ? `http://localhost:${port}/` : '/dist/',
  server: {
    port,
    hmr: {
      host: 'localhost',
    },
    origin: `http://localhost:${port}`,
  },
  build: {
    watch: isDev
      ? {}
      : undefined,
    outDir: r('extension/dist'),
    emptyOutDir: false,
    sourcemap: isDev ? 'inline' : false,
    // https://developer.chrome.com/docs/webstore/program_policies/#:~:text=Code%20Readability%20Requirements
    terserOptions: {
      mangle: false,
    },
    rollupOptions: {
      input: {
        options: r('src/options/index.html'),
        popup: r('src/popup/index.html'),
        content: r('src/contentScripts/index.ts')
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
}))
