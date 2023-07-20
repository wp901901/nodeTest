import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Cookies from "js-cookie";
import Layout from '@/layout/AppLayout.vue';
import AppMain from '@/layout/components/AppMain.vue';
// 导入pinia
import {loginUser} from '@/store/users' 
import {permissionStore} from '@/store/permission'

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

// 路由白名单
const whiteList: Array<string> = ['/','/login']

// 设置路由守卫，如果没有登录只允许去到登录注册页
router.beforeEach((to,from,next) => {
    // console.log('to',to);
    
     // 注册pinia
    const userInfo = loginUser();
    const permission = permissionStore()
    document.title = to.meta.title;
    const hasToken = userInfo.getToken;
    console.log('hasToken',hasToken);
    
    if(hasToken){
        if(to.path === '/login'){
            next({path:'/'});
        }else{
            console.log('userInfo',userInfo.getterUserInfo);
            
            const hasRoles = userInfo.getIdentity && userInfo.getIdentity.length > 0;   // 1. 根据用户是否具有权限列表，判断用户时候已经登录
            console.log('hasRoles',hasRoles);
            
            if(hasRoles){
                console.log('hasRolesTrue');
                next()
            }else{
                console.log('hasRolesFalse');
                try{
                    console.log('try');
                    userInfo.getUserInfo();
                    const roles = userInfo.getIdentity;  // 2. 首次登录从用户信息中获取用户权限列表
                    console.log('roles',roles);
                    
                    const accessedRoutes:any = permission.generateRoutes(roles);    // 3. 根据用户权限列表生成用户可访问动态路由表
                    router.addRoute(accessedRoutes);    // 4. 将用户动态路由表挂载到 router
                    console.log('roles',roles);
                    console.log('accessedRoutes',accessedRoutes);
                    next({ ...to, replace: true })
                }catch (error){
                    console.log('catch',error);
                    userInfo.clearToken();
                    userInfo.clearUser();
                    Cookies.remove('jwtToken')
                    next({path:'/login'})
                }
            }
        }
    }else{
        // has no token
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next({path:'/login'})
        }
    }
    // const token = Cookies.get('jwtToken');
    // if(!token && to.path !== '/login') next({path:'/login'})
    // else next()
})


// 路由重置
// https://blog.csdn.net/qq_58061710/article/details/131763236
export function resetRouter(){
    // 获取所有路由
    router.getRoutes().forEach((route)=>{
        const {name} = route;
        if(name && whiteList.includes(name as string)){     //路由不属于白名单,则删除
            // 如果匹配到路由的name，则根据name删除路由
            router.hasRoute(name) && router.removeRoute(name);
        }
    })
}

// 导出
export default router;

// 动态路由
// https://blog.csdn.net/qq_41773806/article/details/121407661
// https://blog.csdn.net/m0_55170432/article/details/127920722

