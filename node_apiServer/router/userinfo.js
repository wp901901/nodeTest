const express = require('express');
const router = express.Router();

// 导入用户基本信息的处理函数模块
const { getUserInfo, updateUserInfo, updateUserPwd, updateAvatar } = require('../router_handler/userinfo');

// 导入验证数据合法性的中间件
const expressJoi = require('@escook/express-joi');
// 导入需要的验证规则对象
const { update_userinfo_schema, update_userPwd_schema, update_avatar_schema } = require('../schema/user')

// 获取用户信息的基本路由
router.get('/userinfo', getUserInfo)

// 更新用户信息的基本路由
router.post('/updateUserInfo', expressJoi(update_userinfo_schema), updateUserInfo)

// 更新用户密码的基本路由
router.post('/updateUserPwd', expressJoi(update_userPwd_schema), updateUserPwd)

// 更新用户头像的基本路由
router.post('/update/avatar', expressJoi(update_avatar_schema), updateAvatar)

module.exports = router;