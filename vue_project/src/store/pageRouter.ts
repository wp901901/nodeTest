import { defineStore } from 'pinia';
import {pageRouterType} from '@/types/piniaType'

export const pageRouter = defineStore('page',{
    state:():pageRouterType => {
        return{
            showAside:false
        }
    },
})