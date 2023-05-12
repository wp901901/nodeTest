
// https://blog.csdn.net/Cang_Ye/article/details/121722444
import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse,} from 'axios';
import { ElMessage } from 'element-plus'

const createAxios:AxiosInstance = axios.create({
    baseURL:import.meta.env.VITE_BASE_URL,
    timeout:10000,
    // `withCredentials` 表示跨域请求时是否需要使用凭证
    withCredentials:true,
    headers: {
        // 设置后端需要的传参类型
        "X-Requested-With": "XMLHttpRequest",
    },
})

// 请求拦截器
createAxios.interceptors.request.use((config:InternalAxiosRequestConfig)=>{
    // config
})