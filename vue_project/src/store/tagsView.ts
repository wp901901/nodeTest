import { defineStore } from "pinia";

export const tagView = defineStore('tag',{
    state:()=> ({
        visitedViews:[],
        cachedViews: [], // keep-alive缓存用，暂时不开发
    }),
    getters:{
        visitedViewsGetter:(state)=> state.visitedViews
    },
    actions:{
        addVisitedView(routeVal){
            // 避免添加重复路由
            const includesRoute = this.visitedViews.some((item:any) => item.path === routeVal.path)
            includesRoute && this.visitedViews.push(routeVal)
        },
        delVisitedView(routeVal){
            const idx = this.visitedViews.findIndex((item:any) => item.path === routeVal.path);
            this.visitedViews.splice(idx, 1);
        }
    }
})