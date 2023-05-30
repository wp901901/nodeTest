import request from "@/utils/request"
import { login, register } from '@/types/requsetType.d'
import { loginRes } from '@/types/responseType.d'

export function login(data: login) {
    return request<loginRes>({
        url: '/api/users/login',
        method: 'post',
        data
    })
}

export function register(data: register) {
    return request<{}>({
        url: '/api/users/register',
        method: 'post',
        data
    })
}