const express = require('express');
const app = express();

/**
 * 中间件的作用：
 *  多个中间件之间，共享同一份req和res。基于这样的特性，我们可以在上游的中间件中，统一为req或res对象
 *  添加自定义的属性或方法，供下游的中间件或路由进行使用
 */

app.use(function (req, res, next) {
    console.log('这是第一个中间件');
    next()
})

app.use(function(req,res,next){
    console.log('这是第二个中间件');
    next()
})

app.get('/', (req, res) => {
    res.send('url is /');
})

app.get('/user', (req, res) => {
    res.send('url is user');
})

app.listen(80, () => {
    console.log('express server run at http://127.0.0.1');
})