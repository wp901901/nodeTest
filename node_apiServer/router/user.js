// 导入express
const express = require('express');

// 创建路由对象
const router = express.Router();

// 为了保证路由模块的纯粹性，所有的路由处理函数，必须抽离到对应的路由处理函数模块中
// 在/router_handler/user.js中，使用exports对象，分别向外共享如下两个处理函数
const { regUser, login } = require('../router_handler/user.js');

// 1：导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi');
// 2：导入需要的验证规则对象
const { req_login_schema } = require('../schema/user');
// console.log('aaa',req_login_schema);

// 注册新用户
// 3：在注册新用户的路由中，声明局部中间件，对当前请求中携带的数据进行验证
// 3.1：数据验证通过后，会把这次请求流转给后面的路由处理函数
// 3.2：数据验证失败后，终止对后续代码的执行，并抛出一个全局的Error错误，进入全局错误级别中间中进行处理
router.post('/reguser', expressJoi(req_login_schema), regUser)

// 登录
router.post('/login', login)

// 将路由对象共享出去
module.exports = router;
