import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { setupRouter } from './routes'
import useComponent from './plugins/antdv'
import { setupAssets } from '@/plugins'
import 'ant-design-vue/dist/antd.dark.less'

import App from './App.vue'

const app = createApp(App)
useComponent(app)
// 挂载路由
setupRouter(app)

function setupPlugins() {
    // 引入静态资源
    setupAssets()
}

function setupApp() {
    app.use(createPinia())
    // 挂载路由
    setupRouter(app)
    app.mount('#app')
}


setupPlugins()
setupApp()
