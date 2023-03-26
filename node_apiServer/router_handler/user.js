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

// 导入jsonwebtoken，生成token
const jwt = require('jsonwebtoken');

// 导入向外共享加密和还原token的jwtSecretKey字符串，还有token失效时间
const { jwtSecretKey, expiresInTime } = require('../secretConfig')

// 用户数据库名字
const dbUsers = 'ev_users';

// 定义sql查询语句
const selectSql = `select * from ${dbUsers} where username = ?`;



// 注册用户的处理函数
exports.regUser = (req, res) => {
    // 定义插入语句
    const insertSql = `INSERT INTO ${dbUsers} SET ?`
    // 接收表单数据
    const { username, password } = req.body;
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
    const { username, password } = req.body;
    db.query(selectSql, [username], (err, results) => {
        // 执行SQL语句失败
        if (err) { return res.cc(err) }
        // 执行SQL语句成功，但是获取到的数据数据条数不等于1
        if (results.length != 1) { return res.cc(err) };
        // 判断密码是否正确,拿着用户输入的密码，和数据库中存储的密码进行比对
        /**
         * 上面注册中使用了bcrypt.hashSync加密用户注册密码，因此在登录时，需要使用bcrypt.compareSync解密密码
         * 参数1：用户提交的密码
         * 参数2：数据库中的密码
         * 返回值是布尔值，true为一致，false为不一致
         */

        const compareResult = bcrypt.compareSync(password, results[0].password);
        if (!compareResult) {
            return res.cc('登录失败')
        }
        // 登录成功，生成Token字符串（在生成token字符串的时候，一定要剔除密码和头像的值）
        const user = { ...results[0], password: '', user_pic: '' };
        // 登录成功后，调用jwt.sign()方法生成JWT字符串。并通过token属性发送给客户端
        /**
         * 参数1：用户的信息对象
         * 参数2：加密的密钥，
         * 参数3：配置对象，可以配置当前token的有效期，60s,1h等
         */
        const tokenStr = jwt.sign(user, jwtSecretKey, { expiresIn: expiresInTime })
        res.send({
            status: 200,
            message: '登录成功！',
            // 为了方便客户端使用token，在服务器端直接拼上Bearer 的前缀(Bearer后面是有一个空格的)
            token: `Bearer ${tokenStr}`
        })
    })
}