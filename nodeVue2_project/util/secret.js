// 向外共享加密和还原token的jwtSecretKey的字符串
// 定义secret密钥，建议将密钥命名为secretKey
const jwtSecretKey = 'Secret';
module.exports = {
    jwtSecretKey,
    // token的有效期
    expiresInTime:'1h'
}