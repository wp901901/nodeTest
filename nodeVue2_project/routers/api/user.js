const express = require('express');
const router = express.Router();

// 为了保证路由模块的纯粹性，所有的路由处理函数，必须抽离到对应的路由处理函数模块中
// 在/router_handler/user.js中，使用exports对象，分向外共享处理函数
const { registerHandler, loginHandler } = require('../../router_handler/uesr');

// // $route GET /api/users/index
// // @desc 返回的请求的json数据
// // @access public
// router.get('/index', (req, res) => {
//     res.json({ msg: '测试' })
// })

// 注册接口
router.post("/register", registerHandler)
// 登录接口
router.post('/login', loginHandler)


module.exports = router;