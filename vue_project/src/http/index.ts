import request from "@/utils/request"
import { login } from '@/types/requsetType.d'
import { loginRes } from '@/types/responseType.d'

export function login(data:login) {
    return request<loginRes>({
        url:'/api/users/login',
        method:'post',
        data
    })
}