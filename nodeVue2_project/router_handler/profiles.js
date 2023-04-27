/**
 * 在这里定义和用户相关的路由处理函数，供 /router/profile.js 模块进行调用
 */

// 引入数据库操作模块
const db = require('../db/profile')
// 用户数据库名字
const dbUsers = 'profile';

// 注册用户的处理函数
function registerHandler(req, res) {
   res.json({msg:'success'})
}




module.exports = {
    registerHandler
}