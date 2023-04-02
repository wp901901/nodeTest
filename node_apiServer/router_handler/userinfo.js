// 导入数据库
const db = require('../db/index')

// 在头部区域导入 bcryptjs 后，
// 即可使用 bcrypt.compareSync(提交的密码，数据库中的密码) 方法验证密码是否正确
// compareSync() 函数的返回值为布尔值，true 表示密码正确，false 表示密码错误
const bcrypt = require('bcryptjs')



// 获取用户信息
exports.getUserInfo = (req, res) => {
    // 定义查询语句，根据用户的id，查询用户的基本信息
    // 注意：为了防止用户的密码泄露，需要排除password字段
    const selectSql = `SELECT id, username, email, user_pic from ev_users WHERE id = ?`

    // console.log(req.auth);
    /**
     * req.auth:req对象上的auth属性，是Token解析成功，express-jwt中间件帮我们挂载上去的
     * req.body:是我们请求时传递的数据
     */
    db.query(selectSql, [req.auth.id], (err, result) => {
        // 1. 执行 SQL 语句失败
        if (err) { return res.cc(1, err.message) }
        // 2. 执行 SQL 语句成功，但是查询到的数据条数不等于 1
        if (result.length != 1) { return res.cc(1, '获取用户信息失败') }
        // 3. 将用户信息响应给客户端
        res.send({
            status: 200,
            message: '查询成功！',
            data: result[0]
        })
    })
}

// 更新用户信息
exports.updateUserInfo = (req, res) => {
    // console.log(req.body);
    // const updateSql = `UPDATE ev_users SET username = ?, password = ?, WHERE id = ?`
    const updateSql = `UPDATE ev_users SET ? WHERE id = ?`
    /**
     * req.auth:req对象上的auth属性，是Token解析成功，express-jwt中间件帮我们挂载上去的
     * req.body:是我们请求时传递的数据
     */
    db.query(updateSql, [req.body, req.body.id], (err, result) => {
        // 执行SQL语句失败
        if (err) { return res.cc(1, err.message) }
        // 执行SQL语句成功，但是查询到的数据条数不等于1
        if (result.affectedRows != 1) { return res.cc(1, '更新用户信息失败') }
        // 更新成功响应给客户端
        res.send({
            status: 200,
            message: "更新成功！"
        })
    })
}

// 修改用户密码
exports.updateUserPwd = (req, res) => {
    // 定义根据id查询用户数据的SQL语句
    const pwdSelectSql = `SELECT * FROM ev_users WHERE id = ?`;
    /**
     * req.auth:req对象上的auth属性，是Token解析成功，express-jwt中间件帮我们挂载上去的
     * req.body:是我们请求时传递的数据
     */
    db.query(pwdSelectSql, req.auth.id, (err, result) => {
        // console.log(req.auth);
        if (err) {
            return res.cc(err.message)
        }
        // 检查指定id的用户是否存在
        if (result.length != 1) {
            return res.cc('用户不存在！')
        }

        // 判断提交的旧密码是否正确
        const compareResult = bcrypt.compareSync(req.body.oldPwd, result[0].password);
        if (!compareResult) { return res.cc('原密码错误') }

        // 定义更新用户密码的SQL语句
        const updateNewPwdSql = 'UPDATE ev_users SET password = ? WHERE id = ?';
        // `update ev_users set password=? where id=?`
        // 对新密码进行bcrypt加密处理
        const newPwd = bcrypt.hashSync(req.body.newPwd, 10);
        db.query(updateNewPwdSql, [newPwd, req.auth.id], (err, result) => {
            if (err) { return res.cc(err.message) }
            if (result.affectedRows != 1) { return res.cc('更新密码失败！') }

            res.send({
                status: 200,
                message: '更新密码成功'
            })
        })
    })
}

// 更新用户头像
exports.updateAvatar = (req, res) => {
    const updateAvatarSql = 'UPDATE ev_users SET user_pic = ? WHERE id = ?'
    db.query(updateAvatarSql,[req.body.avatar,req.auth.id],(err,result)=>{
        if (err) { return res.cc(err.message) }
        if (result.affectedRows != 1) { return res.cc('更新头像失败！') }
    })
    res.send({
        status: 200,
        message: '更新头像成功'
    })
}