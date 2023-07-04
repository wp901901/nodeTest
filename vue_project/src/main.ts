import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from '@/router/index'
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)  // pinia数据持久化

// console.log('router',router.getRouters());


const app = createApp(App);
// 全局注册El-icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(ElementPlus)
app.use(router)
app.use(pinia)
app.mount('#app')


// 一些报错解决
// https://blog.csdn.net/m0_47135993/article/details/130751866
// element-admin的一些讲解
// https://www.cnblogs.com/fqh123/p/11094296.html
// admin文档
// https://panjiachen.github.io/vue-element-admin-site/zh/guide/
