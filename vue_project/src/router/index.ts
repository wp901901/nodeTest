import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
// 路由信息
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: to => { // redirect是一个方法，返回要重定向的目标
            // 这里可以进行一些判断，决定重定向到哪个页面
            return { path: '/register' } // 比如重定向到首页
        },
    },
    {
        path: '/register',
        component: () => import('@/view/register.vue')
    }
];
// https://www.mulingyuer.com/archives/815/
// 路由
const router = createRouter({
    history: createWebHistory(),
    routes,
})
// 导出
export default router;