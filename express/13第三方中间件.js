const express = require('express');
const app = express();

// 飞express官方内置的，而是由第三方开发出来的中间件，就叫做第三方中间件
/**
 * 1：npm i body-parser安装第三方中间件
 * 2：使用require导入中间件
 * 3：调用app.use注册并使用中间件
 * 
 * 注意：express内置的express.urlencoded中间件，就是基于body-parser这个第三方中间件进一步封装出来的
 */ 
 
const parser = require('body-parser');
app.use(parser.urlencoded({extended:false}))    // 使用Postman body-> x-www-form-urlencoded发送数据（post格式）

app.post('/about',(req,res)=>{  // 测试express.json()
    // 在服务器，可以使用req.body这个属性，来接收客户端发送过来的请求体数据
    // 默认情况下，如果不配置解析表单数据的中间件，则req.body默认等于undefined
    console.log(req.body);
    res.send('OK!')
})

app.listen(80, () => {
    console.log('express server run at http://127.0.0.1');
})