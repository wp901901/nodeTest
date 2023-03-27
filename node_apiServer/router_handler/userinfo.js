// 导入数据库
const db = require('../db/index')

// 定义查询语句，根据用户的id，查询用户的基本信息
// 注意：为了防止用户的密码泄露，需要排除password字段
const selectSql = `SELECT id, username, email, user_pic from ev_users WHERE id = ?`


exports.getUserInfo = (req, res) => {
    // console.log(req.auth);
    // 注意：req对象上的auth属性，是Token解析成功，express-jwt中间件帮我们挂载上去的
    db.query(selectSql, [req.auth.id], (err, result) => { 
        // 1. 执行 SQL 语句失败
        if(err){ return res.cc(1,err.message)}
        // 2. 执行 SQL 语句成功，但是查询到的数据条数不等于 1
        if(!result.length){ return res.cc(1,'获取用户信息失败')}
        // 3. 将用户信息响应给客户端
        res.send({
            status:200,
            message:'查询成功！',
            data:result[0]
        })
    })
}