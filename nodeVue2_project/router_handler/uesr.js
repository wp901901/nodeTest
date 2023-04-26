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
const bcrypt = require('bcryptjs');
// 导入jsonwebtoekn，生成token
const jwt = require('jsonwebtoken');
// 导入向外共享加密和还原token的jwtSecretKey字符串，还有token失效时间
const { jwtSecretKey, expiresInTime } = require('../util/secret');

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
function loginHandler(req, res) {
    const { email, password } = req.body;
    const selectSql = `SELECT * FROM ${dbUsers} WHERE email = ?`;
    db.query(selectSql, email, (err, result) => {
        // 执行SQL语句失败
        if (err) { return res.cc(err.message, 500) }
        // 执行SQL语句成功，但是获取到的数据条数不等于1
        if (result.length != 1) { return res.cc('用户不存在', 404) }
        // 判断密码是否正确，拿着用户输入的密码，和数据库中存储的密码进行比对
        /**
         * 上面注册中使用了bcrypt.hashSync加密用户注册密码，因此在登录时，需要使用bcrypt.compareSync解密密码
         * 参数1：用户提交的密码
         * 参数2：数据库中的密码
         * 返回值是布尔值，true为一致，false问不一致
         */
        const compareResult = bcrypt.compareSync(password, result[0].password);
        if (!compareResult) {
            return res.cc('用户名或密码错误', 500)
        }
        // 登录成功，生成Token字符串（在生成token字符串的时候，不要把密码放进去，这里将头像的值也剔除了）
        const user = { ...result[0], password: '', avatar: '' };
        // 登录成功后，调用jwt.sign()方法生成JWT字符串。并通过token属性发送给客户端
        /**
         * 参数1：用户的信息对象（可以随意）
         * 参数2：加密的密钥（可以随意）
         * 参数3：配置对象，可以配置当前token 的有效期，3600（默认ms）,60s,1h等
         * 参数4：一个回调函数（这里不用）
         */
        const tokenStr = jwt.sign(user, jwtSecretKey, { expiresIn: expiresInTime });
        res.cc({
            message: '登录成功！',
            // 为了方便客户端使用token，在服务器端直接拼上Bearer 的前缀(Bearer后面是有一个空格的)
            token: `Bearer ${tokenStr}`
        },200)
    })
}

module.exports = {
    registerHandler,
    loginHandler
}