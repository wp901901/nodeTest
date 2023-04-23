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
        res.status(status).json({message:msg instanceof Error ? msg.message : msg})
    }
    next()
})

// 导入路由模块
const users = require('./routers/api/user');
// 使用中间件注册路由模块
app.use('/api/users', users)

app.get('/', (req, res) => {
    res.send('ok')
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
