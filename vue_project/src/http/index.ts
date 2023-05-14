import http from "@/utils/request"

export function login(data){
    return http.request({
        url:'',
        method:'post',
        data
    })
}