// 导入express模块
const express = require('express');

// 创建express的服务器实例
const app = express();

// 导入cors中间件，解决跨域问题
const cors = require('cors');
// 将cors注册为全局中间件
app.use(cors())

// 配置解析表单数据的中间件
// 该配置只能解析application/x-www-form-urlencoded格式的表单数据
app.use(express.urlencoded({ extended: false }))

// 响应数据的中间件，做一个简单的封装(一定要在路由之前)
app.use((req,res,next)=>{
    // status = 0 为成功，status = 1为失败，默认将status的值设置为1，方便处理失败的情况
    res.cc = function(status = 1,msg){
        res.send({
            // 状态
            status,
            // 状态描述，判断err是错误对象还是字符串
            message:msg instanceof Error ? msg.message : msg
        })
    }
    next()
})

// 导入并注册用户路由模块(并且请求时，需要在拼接/api才能请求，统一的访问前缀)
const userRouter = require('./router/user')
app.use('/api',userRouter)

// 调用app.listen方法，指定端口号并启动web服务器
app.listen(3007, () => {
    console.log('api server running at http://127.0.0.1:3007')
})