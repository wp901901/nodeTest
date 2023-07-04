import { defineStore } from "pinia";
// import router from '@/router/index'
// import {useRouter} from 'vue-router'

// const router = useRouter()
// console.log('router',router);


export const aside = defineStore("meunAside", {
    state:()=>{
        return {
            menuRouters:[]
        }
    }
})