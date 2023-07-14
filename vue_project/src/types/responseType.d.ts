export interface httpRes<T> {
    code: number,
    message: string,
    content: T
}


export interface loginRes {
    token: string
}

export interface userInfo {
    avatar:string
    date:string
    email:string
    exp:number
    iat:number
    id:number
    identity:string
    name:string
    password:null
    password2:null,
}

// export interface getUserInfo{
//     id:number,
//     identity:string
// }

export interface userInfoPinia{
    user:userInfo,
    token:string,
}