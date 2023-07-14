// 导入数据库操作模块
const db = require('../db/mysqlDB')
// 用户数据库名字
const dbUsers = 'adminuser';

// 获取用户信息接口
function currentHandler(req, res) {
    const selSql = `SELECT * FROM ${dbUsers} WHERE id = ?`;
    const {id} = req.body;
    db.query(selSql, [id], (selErr, selResult) => {
        if (selErr) { return res.cc(selErr.message,5003) }
        if (!selResult.length) { return res.cc('用户不存在',5001) }
        res.cc('请求成功', 200,{
            id:selResult[0].id,
            email:selResult[0].email,
            name:selResult[0].name,
            identity:selResult[0].identity
        })
    })
}

module.exports = {
    currentHandler
}