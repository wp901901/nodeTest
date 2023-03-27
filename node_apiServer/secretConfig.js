// 向外共享加密和还原token的jwtSecretKey字符串
// 定义 secret 密钥，建议将密钥命名为 secretKey
const jwtSecretKey = 'ICC-EddiePeng soCool'; // key值可以自定义
module.exports = {
    jwtSecretKey,
    // token的有效期
    expiresInTime:'1h'
}