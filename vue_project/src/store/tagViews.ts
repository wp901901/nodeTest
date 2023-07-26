import { defineStore } from "pinia";

const tagView = defineStore('tag',{
    state:()=> ({
        visitedViews:[],
        cachedViews: [], // keep-alive缓存用，暂时不开发
    }),
    actions:{
        addVisitedView(view:any){
            this.visitedViews.push(view)
        }
    }
})