// 1.导入express
const express = require('express');

// 2.创建web服务器
const app = express();


// 4.监听客户端的GET和POST请求，并向客户端响应具体的内容
app.get('/user',(req,res)=>{
    console.log('user_get');
    // 调用express提供的res.send()方法，向客户端响应一个JSON对象
    res.send({name:'zs',age:20,gender:'男'})
})

app.post('/user',(req,res)=>{
    console.log('user_post');
    // 调用express提供的res.send()方法，向客户端响应一个文本字符串
    res.send('请求成功')
})

// 3.启动web服务器
app.listen(80,()=>{
    console.log('express server run at http://127.0.0.1');
})