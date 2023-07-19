import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Cookies from "js-cookie";
import Layout from '@/layout/AppLayout.vue';
import AppMain from '@/layout/components/AppMain.vue';

// 路由信息(无需权限)
export const constantRoutes : Array<RouteRecordRaw> = [
    // 不需要在这里重定向，router文件中的路由守卫会自动判断有没有登录，然后拦截跳转到登录页
    // {
    //     path: '/',
    //     redirect: to => { // redirect是一个方法，返回要重定向的目标
    //         // 这里可以进行一些判断，决定重定向到哪个页面
    //         return { path: '/register' } // 比如重定向到首页
    //     },
    // },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/view/login.vue'),
        meta: {
            titie:'登录',
            hidden: true
        }
    },
    {
        path:'/',
        name:'Layout',
        component:Layout,
        redirect:'/index',
        meta: {
            title:'首页',
            icon:'House'
        },
        children:[
            {
                path: '/index',
                component: () => import('@/view/index.vue'),
                meta: {
                    title:'首页',
                    // icon:'House'
                }
            },
            
        ]
    },
    
    // {
    //     path:'/a',
    //     name:'Layout',
    //     component:Layout,
    //     children:[
    //         {
    //             path: '/userInfo',
    //             component: () => import('@/view/userInfo/index.vue'),
    //             meta: {
    //                 title:'个人信息页面',
    //                 icon:'House'
    //             },
    //             // children:[
    //             //     {
    //             //         path: '/userInfo',
    //             //         component: () => import('@/view/userInfo/index.vue'),
    //             //         meta: {
    //             //             title:'我的个人信息',
    //             //             icon:'House'
    //             //         }
    //             //     }
    //             // ]
    //         },
    //     ]
    // }
    // {
    //     path: '/index',
    //     component: () => import('@/view/index.vue')
    // }
];

// 需要权限的路由信息
export const needAuthRoutes : Array<RouteRecordRaw> = [
    {
        path: '/user',
        name: 'User_Nav',
        redirect:'/userInfo',
        component: Layout,
        meta: {
            title:'用户',
            hidden: false,
            icon:'User'
        },
        children:[
            {
                path: '/userInfo',
                name:'userInfo',
                component: () => import('@/view/userInfo/index.vue'),
                meta: {
                    title:'我的个人信息',
                    hidden: false,
                    icon:'House',
                    roles:['superAdmin','admin','user']
                }
            },
            {
                path: '/register',
                name:'register',
                component: () => import('@/view/userInfo/register.vue'),
                meta: {
                    title:'用户注册页面',
                    hidden: false,
                    icon:'House',
                    roles:['superAdmin']
                }
            }
        ]
    },
]

// https://www.mulingyuer.com/archives/815/
// 路由
const router = createRouter({
    history: createWebHistory(),
    routes:constantRoutes,
    scrollBehavior:() => {
        return {
            top:0
        }
    }
})


// router.matcher = newRouter.matcher;
console.log('router.matcher',router);


// 设置路由守卫，如果没有登录只允许去到登录注册页
router.beforeEach((to,from,next) => {
    // console.log('to',to);
    // console.log('from',from);
    
    
    const token = Cookies.get('jwtToken');
    if(!token && to.path !== '/login') next({path:'/login'})
    else next()
})
// 导出
export default router;

// 动态路由
// https://blog.csdn.net/qq_41773806/article/details/121407661
// https://blog.csdn.net/m0_55170432/article/details/127920722

