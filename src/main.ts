import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import routes from './router/index'
import * as VueRouter from 'vue-router'

const app = createApp(App)

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes
})

app.use(ElementPlus)
app.use(router)
app.mount('#app')
