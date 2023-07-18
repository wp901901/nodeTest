import {constantRoutes,needAuthRoutes} from '@/router/index'

// 检验用户是否具有进入该路由权限
function hasPermission(roles:string[],route:any){
    if(roles.includes(route.meta?.roles)){
        return roles.some(role => route.meta.roles.includes(role))
    }
    return true;
}