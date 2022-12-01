/**
 * 为了方便对路由进行模块化的管理，express不建议将路由直接挂载到app上，而是推荐将路由抽离为单独的模块
 * 
 * 将路由抽离为单独的模块的步骤如下
 *  1：创建路由模块对应的.js文件
 *  2：调用express.Router()函数创建路由对象
 *  3：向路由对象上挂载具体的路由
 *  4：使用module.exports向外共享路由对象
 *  5：使用app.use()函数注册路由模块
 */

const express = require('express');
// 导入路由模块
const useRouter = require('./express-router/router')
const app = express()

// 注册路由模块
app.use(useRouter)
// 如果需要为路由模块添加前缀，可以类似于静态资源统一挂载访问前缀一样
// 此时就需要http://127.0.0.1/api/login/out 来进行访问
// app.use('/api',useRouter)

// app.use()函数的作用，就是来注册全局中间件

app.listen(80,()=>{
    console.log('express server run at http://127.0.0.1');
})