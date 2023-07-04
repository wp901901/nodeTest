// import { defineStore } from 'pinia';
// import {pageRouterType} from '@/types/piniaType'

// export const pageRouter = defineStore('page',{
//     state:():pageRouterType => {
//         return{
//             showAside:false
//         }
//     },
//     getters:{
//         getHideVal:(state):boolean => {
//             console.log(state.showAside);
//             return state.showAside
//         } 
//     },
//     actions:{
//         changeShowSide(show:boolean){
//             console.log('changeShowSideshow',show);
//             this.showAside = show
//         }
//     }
// })