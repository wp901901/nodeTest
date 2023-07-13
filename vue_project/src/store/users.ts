import { defineStore } from 'pinia'
import { userInfo,userInfoPinia } from '@/types/responseType.d'
import { login } from '@/http/index'
import { ElMessage } from 'element-plus'
import Cookies from "js-cookie";


export const loginUser = defineStore('userInfo', {
    state: ():userInfoPinia => ({
        user:{
            avatar:'',
            date:'',
            email:'',
            exp:0,
            iat:0,
            id:0,
            identity:'',
            name:'',
            password:null,
            password2:null
        },
        token:''
    }),
    persist:{
        storage: localStorage,
    },
    getters:{
        getUserInfo:(state):userInfo => state.user
    },
    actions:{
        setUser(value:userInfo){
            console.log('setUser');
            
            this.user = value;
        },
        setToken(token:string){
            this.token = token;
        },
        clearUser(){
            this.user = {
                avatar:'',
                date:'',
                email:'',
                exp:0,
                iat:0,
                id:0,
                identity:'',
                name:'',
                password:null,
                password2:null,
            }
        },
       userlogin(email:string,password:string){
        console.log('login1');
        
            return new Promise(async (resolve,reject)=>{
        console.log('login2');
                const res = await login({email,password})
                if(res.code != 200){reject(res);return ElMessage.error(res.message);}
                ElMessage({ message: res.message, type: 'success'})
                const { token } = res.content;
                Cookies.set('jwtToken',token,{expires:7})
                this.setToken(token)
                resolve(res)
            })
        },
        clearToken(){
            this.token = ''
        }
    }
})

// 在 Pinia 的 state 函数中，我们返回的是一个对象，该对象的属性将成为状态的一部分。在你的情况下，我们返回的是一个包含一个属性的对象 { user: User }，其中 user 是状态的属性，其类型为 User。

// 这样做是为了确保 user 属性被正确声明为状态的一部分，并且可以通过 this.user 访问到该属性。当你在 store 中访问状态时，可以使用 this.user 来读取或修改 user 属性的值。

// 总结一下，{ user: User } 表示将 user 属性添加到状态对象中，以便在 store 中访问和修改它。