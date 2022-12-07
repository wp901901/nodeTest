const express = require('express');
const app = express();

// 错误级别中间件的function处理函数中，必须有4个形参，形参顺序从前到后，分别是(err,req,res,next)

// 1:定义路由
app.get('/',(req,res)=>{
    // 人为的制造错误
    throw new Error('服务器内部发生了错误！')
    res.send('Home page')   // 该代码仅测试用，无法执行，如果未使用错误级别中间件，则会整个页面报错
})

// 2.定义错误级别的中间件，捕获整个项目的异常错误，从而防止程序的崩溃
// 错误级别的中间件，必须注册在所有路由之后！
app.use((err,req,res,next)=>{
    console.log('发生了错误!' + err.message);
    res.send('Error:' + err.message)
})
 

app.listen(80, () => {
    console.log('express server run at http://127.0.0.1');
})