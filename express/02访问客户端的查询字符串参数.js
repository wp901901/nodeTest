// 导入express
const express = require('express');

// 创建web服务器
const app = express();

// 接收查询字符串
app.get('/',(req,res)=>{
    // req,query默认是一个空对象
    // 客户端使用?name=zs&age=20 这种查询字符串形式，发送到服务器的参数
    // 可以通过req.query对象访问到，例如：
    // req.query.name  req.query.age
    // console.log(req);
    console.log(req.query);
    res.send('请求成功')
})

// url地址中，可以通过 :参数名 的形式，匹配动态参数值,这里的id就是动态参数
app.get('/user/:id',(req,res)=>{
    // req.params 默认是一个空对象
    // 里面存放着通过 : 动态匹配到的参数值
    console.log(req.params);
    console.log(req.query);
    res.send(req.params)
})

// 多个动态参数
app.get('/login/:id/:username',(req,res)=>{
    console.log(req.params);
})

// 启动服务器
app.listen(80,()=>{
    console.log('express server run at http://127.0.0.1');
})