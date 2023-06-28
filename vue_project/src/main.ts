import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia';
import router from '@/router/index'
const pinia = createPinia();


const app = createApp(App);
app.use(pinia)
app.use(ElementPlus)
app.use(router)
app.mount('#app')


// 一些报错解决
// https://blog.csdn.net/m0_47135993/article/details/130751866
// element-admin的一些讲解
// https://www.cnblogs.com/fqh123/p/11094296.html
// admin文档
// https://panjiachen.github.io/vue-element-admin-site/zh/guide/
