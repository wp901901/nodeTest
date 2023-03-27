// 导入express模块
const express = require('express');

// 创建express的服务器实例
const app = express();
const joi = require('joi');

// 导入cors中间件，解决跨域问题
const cors = require('cors');

// 导入用户将客户端发送过来的JWT字符串，解析还原成JSON对象的包
// 一定要在路由之前配置token中间件
const { expressjwt } = require('express-jwt');
// 导入向外共享加密和还原token的jwtSecretKey字符串
const { jwtSecretKey } = require('./secretConfig');


// 将cors注册为全局中间件
app.use(cors())

// 配置解析表单数据的中间件
// 该配置只能解析application/x-www-form-urlencoded格式的表单数据
app.use(express.urlencoded({ extended: false }))

// 响应数据的中间件，做一个简单的封装(一定要在路由之前)
app.use((req, res, next) => {
    // status = 0 为成功，status = 1为失败，默认将status的值设置为1，方便处理失败的情况
    res.cc = function (status = 1, msg) {
        res.send({
            // 状态
            status,
            // 状态描述，判断err是错误对象还是字符串
            message: msg instanceof Error ? msg.message : msg
        })
    }
    next()
})

// 注册将JWT字符串解析还原成JSON对象的中间件
// (放在这里的原因是，如果放在上面的响应数据的中间件之前，会抛出res.cc is not a function的错误)
/**
 * expressjwt({secret:jwtSecretKey}) 就是用来解析Token的中间件
 * .unless({path:[/^\/api\//]}) 用来指定哪些接口不需要访问权限
 */
// 注意：主要配置成功了express-jwt这个中间件，就可以把解析出来的用户信息，挂载在req.auth属性上（auth属性就是express-jwt中间生成的）
// 这个req.auth包含什么内容，是由jwt.sign中的第一个属性决定的，这里只配置了username,需要声明就在jwt.sign中的第一个属性中添加什么
// 但是不要包含密码等敏感信息
app.use(expressjwt({ secret: jwtSecretKey, algorithms: ['HS256'] }).unless({ path: [/^\/api\//] }))

// 导入并注册用户路由模块(并且请求时，需要在拼接/api才能请求，统一的访问前缀)
const userRouter = require('./router/user');
app.use('/api', userRouter)

// 导入用户信息相关路由模块
const userInfoRouter = require('./router/userinfo');
app.use('/my',userInfoRouter)

// 全局错误级别中间件
app.use(function (err, req, res, next) {
    // 数据验证失败
    if (err instanceof joi.ValidationError) { return res.cc(1, err) }
    // 捕获身份认证失败的错误
    if (err.name === 'UnauthorizedError') { return res.cc('身份认证失败！') }
    // 未知错误
    res.cc(1, err)
})

// 调用app.listen方法，指定端口号并启动web服务器
// 使用node app.js执行项目
// http://127.0.0.1:3007/api/reguser 调用注册接口
app.listen(3007, () => {
    console.log('api server running at http://127.0.0.1:3007')
})