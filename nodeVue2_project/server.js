const express = require('express');
const app = express();
// https://www.bilibili.com/video/BV1R341167Fw?p=3&spm_id_from=pageDriver&vd_source=81d57cf597c0e7a00c33990ece51e281
const port = process.env.PORT || 3000;
const cors = require('cors')


// 解决跨域
app.use(cors())
// 通过express.json()这个中间件，解析表单中的JSON格式的数据
app.use(express.json())// 使用Postman body-> raw -> JSON发送数据（post格式）
// 配置解析表单数据的中间件
// 该配置只能解析application/x-www-form-urlencoded格式的表单数据
app.use(express.urlencoded({ extended: false }))
// 导入用户将客户端发送过来的JWT字符串，解析还原成JSON对象的包
// 一定要在路由之前配置token中间件
const { expressjwt } = require('express-jwt');
// 导入向外共享加密和还原token的jwtSecretKey字符串
const { jwtSecretKey } = require('./util/secret');

// 响应数据的中间件，做一个简单的封装（一定要在引入路由之前）
app.use((req, res, next) => {
    // status = 200 为成功，status = 500为失败，默认将status的值设置为500，方便处理失败的情况
    res.cc = function (msg, status = 500) {
        // res.send({
        //     // 状态
        //     status,
        //     // 状态描述，判断err是错误对象还是字符串
        //     message: msg instanceof Error ? msg.message : msg
        // })
        res.status(status).json({ message: msg instanceof Error ? msg.message : msg })
    }
    next()
})

// 注册将JWT字符串解析还原成JSON对象的中间件
// 放在这里的原因是，如果放在上面的响应数据的中间件之前，会抛出res.cc is not a function的错误
/**
 * expressjwt({secret:jwtSecretKey})就是用来解析Token的中间件
 * HS256 使用同一个「secret_key」进行签名与验证,RS256 是使用 RSA 私钥进行签名，使用 RSA 公钥进行验证。
 * .unless({path:[/^\/api\//]})用来指定哪些接口不需要访问权限
 */
// 注意：主要配置成功了express-jwt这个中间件，就可以把解析出来的用户信息，挂载在req.auth属性上（auth属性就是express-jwt中间生成的）
// 这个req.auth包含什么内容，是由jwt.sign中的第一个属性决定的，这里只配置了user,需要声明就在jwt.sign中的第一个属性中添加什么
// 但是不要包含密码等敏感信息
app.use(expressjwt({ secret: jwtSecretKey, algorithms: ['HS256'] }).unless({path:[/^\/api\//]}))
// 导入路由模块
const users = require('./routers/api/user');
const userInfo = require('./routers/api/userinfo')
// 使用中间件注册路由模块
app.use('/api/users', users)
app.use('/my',userInfo)

// 全局错误级别中间件
app.use(function (err, req, res, next) {
    console.log(err);
    // 捕获身份认证失败的错误
    if (err.name === 'UnauthorizedError') { return res.cc('身份认证失败！') }
    // 未知错误
    res.cc(err)
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
