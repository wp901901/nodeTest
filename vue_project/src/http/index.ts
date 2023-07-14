import request from "@/utils/request"
import { login, register } from '@/types/requsetType.d'
import { loginRes } from '@/types/responseType.d'

// 登录
export function login(data: login) {
    return request<loginRes>({
        url: '/api/users/login',
        method: 'post',
        data
    })
}

// 注册
export function register(data: register) {
    return request<{}>({
        url: '/api/users/register',
        method: 'post',
        data
    })
}

// 获取用户信息
export function getUserInfo(data: register) {
    return request<{}>({
        url: '/api/my/current',
        method: 'post',
        data
    })
}