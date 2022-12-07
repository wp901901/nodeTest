const express = require('express');
const app = express();

// 定义一个最简单的中间件
const mw = function (req, res, next) {
    /**
     * 客户端发起的任何请求，到达服务器之后，都会触发的中间件，叫做全局生效的中间件
     * 通过调用app.use(中间件函数)，即可定义一个全局生效的中间件
     */
    console.log('这是最简单的中间件函数');
    // 把流转关系，转交给下一个中间件或路由（需要调用next才会继续往下走
    next()
}

// 将mw注册为全局生效的中间件
app.use(mw)

/**
 * 或简写成：
 * app.use(function(req,res,next){
 *      console.log('这是最简单的中间件函数');
 *      next()
 * })
 */

app.get('/', (req, res) => {
    res.send('url is /');
})

app.get('/user', (req, res) => {
    res.send('url is user');
})

app.listen(80, () => {
    console.log('express server run at http://127.0.0.1');
})