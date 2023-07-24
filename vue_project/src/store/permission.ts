import {constantRoutes,needAuthRoutes} from '@/router/index'
import { defineStore } from 'pinia'

// 检验用户是否具有进入该路由权限
// function hasPermission(roles:string[],route:any){
//     if(roles.includes(route.meta?.roles)){
//         return roles.some(role => route.meta.roles.includes(role))
//     }
//     return true;
// }

function hasPermission(roles:string[], route:any) {
    console.log('hasPermission_roles',roles);
    console.log('hasPermission_route',route);
    
    if (route.meta && route.meta.roles) {
        return roles.some(role => route.meta.roles.includes(role))
    } else {
        return true
    }
}

// 递归过滤asyncRoutes路由中的roles可进入的路由
export function filtersAsyncRoutes(routes:any,roles:string[]){
    console.log('filtersAsyncRoutes_routes',routes);
    
    const res:any[] = [];
    routes.forEach((route:any) => {
        const tmp = { ...route };
        if (hasPermission(roles, tmp)) {
            if (tmp.children) {
                tmp.children = filtersAsyncRoutes(tmp.children, roles);
            }
            res.push(tmp);
        }
    })
    return res;
}

export const permissionStore = defineStore('permission', {
    state: () => ({
        routes: [] as any[],
        addRoutes: [] as any[],
    }),
    getters: {
        permission_routes: (state) => state.routes
    },
    actions: {
        SET_ROUTES(routes:any){
            this.addRoutes = routes;
            console.log('constantRoutes',routes);
            
            this.routes = constantRoutes.concat(routes);
        },
        generateRoutes(roles:any){
            let accessedRoutes;
            if(roles.includes('superAdmin')){
                console.log('superAdmin');
                
                accessedRoutes = needAuthRoutes || [];
            }else{
                accessedRoutes = filtersAsyncRoutes(needAuthRoutes,roles);
            }
            console.log('accessedRoutes',accessedRoutes);
            
            this.SET_ROUTES(accessedRoutes);
            return accessedRoutes
        }
    },
    persist:{
        storage: localStorage,
    },
})