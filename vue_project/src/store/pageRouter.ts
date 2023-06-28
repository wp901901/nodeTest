import { defineStore } from 'pinia';
import {pageRouterType} from '@/types/piniaType'

export const pageRouter = defineStore('page',{
    state:():pageRouterType => {
        return{
            showAside:false
        }
    },
    getters:{
        getHideVal:(state):boolean => state.showAside
    },
    actions:{
        changeShowSide(show:boolean){
            console.log('show',show);
            this.showAside = show
        }
    }
})