
// https://blog.csdn.net/Cang_Ye/article/details/121722444
import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosRequestConfig, AxiosResponse, } from 'axios';
import { ElMessage } from 'element-plus'
import { httpRes } from '@/types/responseType'

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

// 请求拦截器
createAxios.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // 在发送请求之前做些什么，例如添加token等
      // config.headers['Authorization'] = 'Bearer ' + getToken();
      return config;
    },
    (error) => {
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
      return response.data;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
// 这样拿到的数据有类型校验哦
const request = <T>(options: AxiosRequestConfig): Promise<httpRes<T>> => {
    console.log('options',options);
  
    return createAxios(options);
}
export default request;