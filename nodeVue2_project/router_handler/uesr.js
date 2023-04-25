/**
 * 在这里定义和用户相关的路由处理函数，供 /router/user.js 模块进行调用
 */

// 引入数据库操作模块
const db = require('../db/index')
// 用户数据库名字
const dbUsers = 'adminuser';
// 导入头像生成模块
const gravatar = require('gravatar');
/**
 * 使用bbcryptjs对用户密码进行加密，
 *  优点：加密之后的密码，无法被逆向破解，
 *      同一明文密码多次加密，得到的加密结果各不相同，保证了安全性 
 */
const bcrypt = require('bcryptjs')

// 注册用户的处理函数
function registerHandler(req, res) {
    console.log(req.body);
    const selectSql = `SELECT * FROM ${dbUsers} WHERE email = ?`;
    let { email, password } = req.body;
    const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' });
    if (!email || !password) { return res.cc('用户名或密码不能为空！', 500) }
    db.query(selectSql, [req.body.email], (selErr, selResult) => {
        // 发生错误直接返回
        if (selErr) { return res.status(500).json({ message: selErr.message }) }
        // 如果查询的长度不为0，说明已经有数据存在
        if (selResult.length) { return res.status(500).json({ message: '该邮箱已被占用' }) }
        // 对用户的密码进行bcrypt加密，返回值是加密之后的密码字符串
        password = bcrypt.hashSync(password, 10);
        // 执行插入数据操作
        db.query(`INSERT INTO ${dbUsers} SET ?`, {
            email,
            name: email,
            avatar,
            password
        }, (err, result) => {
            if (err) { return res.cc(err.message, 500) }
            if (result.affectedRows !== 1) { return res.cc('注册用户失败，请稍后重试', 500) }
            res.cc('注册成功', 200)
        })
    })
}

// 用户登录的处理函数
function loginHandler(req,res) {
    
}

module.exports = {
    registerHandler,
    loginHandler
}