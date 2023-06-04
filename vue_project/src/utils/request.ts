
// https://blog.csdn.net/Cang_Ye/article/details/121722444
import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosRequestConfig, AxiosResponse, } from 'axios';
import { ElLoading,ElMessage } from 'element-plus'
import { httpRes } from '@/types/responseType'
import Cookies from "js-cookie";

const createAxios: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 10000,
    // `withCredentials` 表示跨域请求时是否需要使用凭证
    withCredentials: true,
    // headers: {
    //     // 设置后端需要的传参类型
    //     "X-Requested-With": "XMLHttpRequest",
    // },
})
let loadingInstance:any;
// 请求拦截器
createAxios.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = Cookies.get('jwtToken');
      config.headers.Authorization = token;
      // 在发送请求之前做些什么，例如添加token等
      // config.headers['Authorization'] = 'Bearer ' + getToken();
      loadingInstance = ElLoading.service({
        target:'#app',
        background:'rgba(0,0,0,0.7)',
        text:'加载中...',
        lock:true
      })
      return config;
    },
    (error) => {
      ElMessage.error(error.message)
      return Promise.reject(error);
    }
  );

// 响应拦截器
createAxios.interceptors.response.use(
    (response: AxiosResponse) => {
      // console.log(response);
      
      // const { code, message } = response.data;
      // if (code !== 200) {
      //   return ElMessage.error(message)
      //   // return Promise.reject(new Error(message || '请求失败'));
      // }
      
      // 如果token失效，则清除cookiejs
      if(response.data.code === 401){
        ElMessage.error('请重新登录')
        Cookies.remove('jwtToken')
        return Promise.reject('请重新登录');
      }

      loadingInstance.close()
      return response.data;
    },
    (error) => {
      loadingInstance.close()
      ElMessage.error(error.message)
      return Promise.reject(error);
    }
  );
// 这样拿到的数据有类型校验哦
const request = <T>(options: AxiosRequestConfig): Promise<httpRes<T>> => {
    console.log('options',options);
  
    return createAxios(options);
}
export default request;