// 导入数据库操作模块
const db = require('../db/mysqlDB')

// 获取用户信息接口
function currentHandler(req, res) {
    const { email, id, name, identity } = req.auth;
    res.cc('请求成功', 200,{
        id,
        email,
        name,
        identity
    })
}

module.exports = {
    currentHandler
}