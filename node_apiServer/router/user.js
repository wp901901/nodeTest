// 导入express
const express = require('express');

// 创建路由对象
const router = express.Router();

// 为了保证路由模块的纯粹性，所有的路由处理函数，必须抽离到对应的路由处理函数模块中
// 在/router_handler/user.js中，使用exports对象，分别向外共享如下两个处理函数
const {regUser,login} = require('../router_handler/user.js')

// 注册新用户
router.post('/reguser',regUser)

// 登录
router.post('/login',login)

// 将路由对象共享出去
module.exports = router;
