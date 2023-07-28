import {RouteRecordRaw,RouteLocationNormalized} from 'vue-router'

export interface tagViewType{
    visitedViews:RouteLocationNormalized[] ,
    cachedViews: RouteRecordRaw[], // keep-alive缓存用，暂时不开发
}