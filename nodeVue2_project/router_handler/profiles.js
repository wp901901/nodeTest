/**
 * 在这里定义和用户相关的路由处理函数，供 /router/profile.js 模块进行调用
 */

// 引入数据库操作模块
const db = require('../db/mysqlDB')
// 用户数据库名字
const dbUsers = 'profile';

// 添加的处理函数
function addHandler(req, res) {
    // 定义插入语句
    const insertSql = `INSERT INTO ${dbUsers} SET ?`;
    const { type, describe, income, expend, cash, remark } = req.body;
    if (!req.body.type) { return res.cc('type值为空') }
    db.query(insertSql, {type, describe, income, expend, cash, remark}, (err, result) => {
        // 执行SQL语句失败
        if (err) {
            // return res.send({ status: 1, message: err.message })
            return res.cc(err.message)
        }
        if (result.affectedRows !== 1) {
            return res.cc('添加信息失败，请稍后再试！')
        }
        res.cc('操作成功！', 200)
    })
}




module.exports = {
    addHandler
}