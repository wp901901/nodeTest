const express = require('express');
const router = express.Router();
// 为了保证路由模块的纯粹性，所有的路由处理函数，必须抽离到对应的路由处理函数模块中
// 在/router_handler/userInfo.js中，使用exports对象，分向外共享处理函数
const { currentHandler } = require('../../router_handler/userinfo');
// 获取用户信息接口
router.post('/current',currentHandler)


module.exports = router;