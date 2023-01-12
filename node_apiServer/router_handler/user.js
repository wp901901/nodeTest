/**
 * 在这里定义和用户相关的路由处理函数，供 /router/user.js 模块进行调用
 */

// 导入数据库操作模块
const db = require('../db/index');


/**
 * 在当前项目中，使用 bcryptjs 对用户密码进行加密，优点：
        加密之后的密码，无法被逆向破解
        同一明文密码多次加密，得到的加密结果各不相同，保证了安全性
 */
const bcrypt = require('bcryptjs')

// 用户数据库名字
const dbUsers = 'ev_users';

// 定义sql查询语句
const selectSql = `select * from ${dbUsers} where username = ?`;

// 定义插入语句
const insertSql = `INSERT INTO ${dbUsers} SET ?`

// 注册用户的处理函数
exports.regUser = (req, res) => {
    console.log('1231321');
    // 接收表单数据
    let { username, password } = req.body;
    // 判断数据是否合法
    if (!username || !password) {
        // return res.send({ status: 1, message: '用户名或密码不能为空！' })
        return res.cc(1, '用户名或密码不能为空！')
    }

    // 执行查询sql语句并判断用户名是否被占用
    db.query(selectSql, [username], (err, result) => {
        // 执行SQL语句失败
        if (err) {
            // return res.send({ status: 1, message: err.message })
            return res.cc(1, err.message)
        }
        // console.log('result', result);
        if (result.length) {
            // return res.send({ status: 1, message: '用户名已被占用' })
            return res.cc(1, '用户名已被占用')
        }
        // 对用户的密码进行bcrypt加密，返回值是加密之后的密码字符串
        password = bcrypt.hashSync(password, 10)
        // console.log(password);
        // 执行插入操作
        db.query(insertSql, { username, password }, (err, result) => {
            // 执行SQL语句失败
            if (err) {
                return res.cc(1, err.message)
            }
            if (result.affectedRows !== 1) {
                return res.cc(1, '注册用户失败，请稍后再试')
            }
            return res.cc(0, '用户注册成功')
        })
    })
    // console.log('username', username);
    // return res.send('reguser OK')
}

// 登录的处理函数
exports.login = (req, res) => {
    res.send('login OK')
}