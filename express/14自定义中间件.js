const express = require('express');
const qs = require('querystring');
const app = express()

/**
 * 需求：
 *  手动模拟一个类似于express.urlencoded这样的中间件，来解析POST提交到服务器的表单数据
 * 
 * 实现步骤：
 *  1：定义中间件
 *  2：监听req的data事件
 *  3：监听req的end事件
 *  4：使用querystring模块解析请求体数据
 *  5：将解析出来的数据对象挂载为req.body
 *  6：将自定义中间件封装为模块
 */

// 定义中间件具体的业务逻辑
app.use((req,res,next)=>{
    // 定义变量，用来存储客户端发送过来的请求体数据
    let str = '';
    // 监听req对象的data事件（客户端发送过来的新的请求体数据）
    req.on('data',(chunk)=>{
        // 拼接请求体数据，隐私转换为字符串
        // console.log('chunk',chunk);
        str += chunk;
        // console.log('str',str);
    })

    // 监听req的end事件
    req.on('end',()=>{
        // 在str中存放的是完整的请求体数据
        // 使用qs把字符串格式的请求体数据，解析成对象格式
        const body = qs.parse(str);
        console.log(body);
    })

})


app.post('/index',(req,res)=>{
    
    console.log('body',req.body);
    res.send('ok')
})



app.listen(80, () => {
    console.log('express server run at http://127.0.0.1');
})