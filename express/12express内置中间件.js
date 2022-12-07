const express = require('express');
const app = express();

/**
 * Express从4.16.0版本开始，内置了3个常用的中间件，极大的提高了Express项目的开发效率和体验
 * 
 *   1：express.static快速托管静态资源的内置中间件，例如：HTML文件、图片、CSS样式等（无兼容性，任何express版本都可用）
 *   2：exports.json解析JSON格式的请求体数据（有兼容性，仅在4.16.0+版本可用）
 *   3：express.urlencoded解析URL-encoded格式的请求体数据（有兼容性，仅在4.16.0+版本可用）
 */

// 注意：除了错误级别的中间件，其他的中间件，必须在路由之前进行配置

// 通过express.json()这个中间件，解析表单中的JSON格式的数据
app.use(express.json()) // 使用Postman body-> raw -> JSON发送数据（post格式）

// 通过express.urlencoded()这个中间件，来解析表单中的url-encoded格式的数据
app.use(express.urlencoded({extended:false}))   // 使用Postman body-> x-www-form-urlencoded发送数据（post格式）

app.post('/about',(req,res)=>{  // 测试express.json()
    // 在服务器，可以使用req.body这个属性，来接收客户端发送过来的请求体数据
    // 默认情况下，如果不配置解析表单数据的中间件，则req.body默认等于undefined
    console.log(req.body);
    res.send('OK!')
})

app.post('/book',(req,res)=>{   // 测试express.urlencoded({extended:false})
    // 在服务器，可以使用req.body这个属性，来接收JSON格式的表单数据和url-encoded格式的数据
    console.log(req.body);
    res.send('OK!')
})
 

app.listen(80, () => {
    console.log('express server run at http://127.0.0.1');
})