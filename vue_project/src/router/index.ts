import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Cookies from "js-cookie";
import Layout from '@/layout/AppLayout.vue';
import {pageRouter} from '@/store/pageRouter';
// import register from '@/view/register.vue';
// console.log('Layout',Layout);
// console.log('register',register);

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
        path:'/',
        name:'Layout',
        component:Layout,
        children:[
            {
                path: '/register',
                component: () => import('@/view/register.vue')
            },
            {
                path: '/index',
                component: () => import('@/view/index.vue')
            }
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
    const hideAside = pageRouter();
    console.log('to',to);
    console.log('from',from);
    // 如果是去登录页则隐藏导航栏
    if(to.path === '/register' || from.path === '/register'){
        hideAside.changeShowSide(false)
    }else{
        hideAside.changeShowSide(true)
    }
    
    const token = Cookies.get('jwtToken');
    if(!token && to.path !== '/register') next({path:'/register'})
    else next()
})
// 导出
export default router;