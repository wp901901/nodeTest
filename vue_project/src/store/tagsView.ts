import { defineStore } from "pinia";
import {RouteRecordRaw,RouteLocationNormalized} from 'vue-router'
import {tagViewType} from '@/types/piniaType/routerType'


export const tagView = defineStore('tag',{
    state:():tagViewType => ({
        visitedViews:[],
        cachedViews: [], // keep-alive缓存用，暂时不开发
    }),
    getters:{
        visitedViewsGetter:(state)=> state.visitedViews
    },
    actions:{
        addVisitedView(routeVal:RouteLocationNormalized){
            if(!routeVal.meta!.title) return
            // 避免添加重复路由
            const includesRoute = this.visitedViews.some((item:any) => item.path === routeVal.path)
            !includesRoute && this.visitedViews.push(routeVal)
        },
        delVisitedView(idx:number){
            // const idx = this.visitedViews.findIndex((item:any) => item.path === routeVal.path);
            this.visitedViews.splice(idx, 1);
        }
    }
})