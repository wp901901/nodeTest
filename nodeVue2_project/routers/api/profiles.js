const express = require('express');
const router = express.Router();

// 为了保证路由模块的纯粹性，所有的路由处理函数，必须抽离到对应的路由处理函数模块中
// 在/router_handler/profiles.js中，使用exports对象，分向外共享处理函数
const { registerHandler } = require('../../router_handler/profiles');


// 注册接口
router.post("/test", registerHandler)


module.exports = router;