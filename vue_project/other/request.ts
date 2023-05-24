/* eslint-disable @typescript-eslint/no-explicit-any */
import { message } from "antd";
import Cookies from "js-cookie";
import { Response } from "@/types/common";
import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosRequestConfig,
} from "axios";
//二次封装axios
const createAxios: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: Number(import.meta.env.VITE_TIME_OUT),
  withCredentials: true, // 异步请求携带cookie
  headers: {
    // 设置后端需要的传参类型
    "Content-Type": "application/json;charset=UTF-8",
    "X-Requested-With": "XMLHttpRequest",
  },
});

//请求拦截器
createAxios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = Cookies.get("TOKEN_KEY");
    config.headers.Authorization = "Bearer " + token;
    //过滤其中不存在的params
    if (config.method === "get") {
      const { params } = config;
      const newParams: any = {};
      if (params && JSON.stringify(params) !== "{}") {
        Object.entries(params).map(([key, value]) => {
          if (value !== "") {
            newParams[key] = value;
          }
        });
        config["params"] = newParams;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//响应拦截
createAxios.interceptors.response.use(
  (response: AxiosResponse) => {
    if (!response.data.succeed) {
      if (response.data.code === 401) {
        message.info("未登录");
        return Promise.resolve("未登录");
      }
      message.error(response.data.codeMsg);
      return Promise.resolve(response.data);
    }
    return response.data;
  },
  (error) => {
    message.error(error.message);
    return Promise.reject(error);
  }
);

const request= <T>(options:AxiosRequestConfig): Promise<Response<T>>=>{
  return createAxios(options);
}
export default request;
