import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from '@/router/index'
import { createPinia } from 'pinia';
const pinia = createPinia();

// 一些报错解决
// https://blog.csdn.net/m0_47135993/article/details/130751866
const app = createApp(App);
app.use(pinia)
app.use(ElementPlus)
app.use(router)
app.mount('#app')
