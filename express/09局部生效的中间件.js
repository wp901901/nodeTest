const express = require('express');
const app = express();

// 不使用app.use注册的中间件，就叫做局部生效的中间件
const mw = function (req, res, next) {
    console.log('这是局部生效的中间件函数');
    next()
}

const mw2 = function(req,res,next){
    console.log('这是第二个局部生效的中间件');
    next()
}

// mw这个中间件只在“当前路由中生效”，这种用法属于“局部生效的中间件”
app.get('/', mw, (req, res) => {
    res.send('url is /');
})

// mw这个中间件不会影响下面这个路由
app.get('/user', (req, res) => {
    res.send('url is user');
})

// 定义多个局部中间件
// app.get('/about',mw,mw2,(req, res) => {
//     res.send('url is about');
// })
// 也可以写成如下这种（上下两种效果是一样的
app.get('/about',[mw,mw2],(req, res) => {
    res.send('url is about');
})

app.listen(80, () => {
    console.log('express server run at http://127.0.0.1');
})