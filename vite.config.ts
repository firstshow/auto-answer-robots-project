import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import DefineOptions from 'unplugin-vue-define-options/vite'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import WindiCSS from 'vite-plugin-windicss'
const CWD = process.cwd()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    WindiCSS(),
    DefineOptions(),
    Components({
      // 自定义组件全局挂载，默认是src/components
      dirs: ['src/components/global'],
      // ui库解析器
      resolvers: [
        VantResolver()
      ],
    }),
    createSvgIconsPlugin({
      iconDirs: [resolve(CWD, 'src/assets/icons')],
      symbolId: 'svg-icon-[dir]-[name]'
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `@import "@/assets/styles/variables.less";`,
        // If you are using less-loader@5 please spread the lessOptions to options directly
        modifyVars: {
          // 这里就是样式变量的名称以及对应的值，可以按照上面提供的官方文档进行配置
          'font-size': '18px'
        },
        javascriptEnabled: true
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
