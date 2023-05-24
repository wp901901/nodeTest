export interface httpRes<T> {
    code: number,
    message: string,
    content: T
}


export interface loginRes{
    token:string
}