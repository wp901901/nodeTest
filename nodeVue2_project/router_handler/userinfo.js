// 导入数据库操作模块
const db = require('../db/index')

// 获取用户信息接口
function currentHandler(req, res) {
    const { email, id, name, identity } = req.auth;
    res.cc({
        id,
        email,
        name,
        identity
    }, 200)
}

module.exports = {
    currentHandler
}