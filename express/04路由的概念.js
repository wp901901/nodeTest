/**
 * 每当一个请求到达服务器之后，需要先经过路由的匹配。只有匹配成功之后，才会调用对应的处理函数
 * 在匹配时，会按照路由的顺序进行匹配，如果请求类型和请求的URL同时匹配成功；则express会将这次请求
 * 转交给对应的function函数进行处理
 */


/**
 * 路由匹配的注意点：
 *  1：按照定义的先后顺序进行匹配
 *  2：请求类型和请求的URL同时匹配成功，才会调用对应的处理函数
 */

const express = require('express');
const app = express();

// 挂载路由
app.get('/user',(req,res)=>{
    res.send('method:GET')
})

app.post('/login',(req,res)=>{
    res.send('method:POST')
})

app.listen(80,()=>{
    console.log('express server run at http://127.0.0.1');
})