import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Cookies from "js-cookie";
import Layout from '@/layout/AppLayout.vue';

// 路由信息
const routes: Array<RouteRecordRaw> = [
    // 不需要在这里重定向，router文件中的路由守卫会自动判断有没有登录，然后拦截跳转到登录页
    // {
    //     path: '/',
    //     redirect: to => { // redirect是一个方法，返回要重定向的目标
    //         // 这里可以进行一些判断，决定重定向到哪个页面
    //         return { path: '/register' } // 比如重定向到首页
    //     },
    // },
    {
        path: '/register',
        component: () => import('@/view/register.vue'),
        // meta: {
        //     hidden: true
        // }
    },
    {
        path:'/',
        name:'Layout',
        component:Layout,
        children:[
            {
                path: '/index',
                component: () => import('@/view/index.vue'),
                meta: {
                    title:'首页',
                    icon:'House'
                }
            },
            {
                path: '/userInfo',
                component: () => import('@/view/userInfo/index.vue'),
                meta: {
                    title:'个人信息页面',
                    icon:'House'
                },
                // children:[
                //     {
                //         path: '/userInfo',
                //         component: () => import('@/view/userInfo/index.vue'),
                //         meta: {
                //             title:'我的个人信息',
                //             icon:'House'
                //         }
                //     }
                // ]
            },
        ]
    }
    // {
    //     path: '/index',
    //     component: () => import('@/view/index.vue')
    // }
];
// https://www.mulingyuer.com/archives/815/
// 路由
const router = createRouter({
    history: createWebHistory(),
    routes,
})

// 

// 设置路由守卫，如果没有登录只允许去到登录注册页
router.beforeEach((to,from,next) => {
    // console.log('to',to);
    // console.log('from',from);
    
    const token = Cookies.get('jwtToken');
    if(!token && to.path !== '/register') next({path:'/register'})
    else next()
})
// 导出
export default router;