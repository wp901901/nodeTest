const express = require('express');
const router = express.Router();

// 为了保证路由模块的纯粹性，所有的路由处理函数，必须抽离到对应的路由处理函数模块中
// 在/router_handler/profiles.js中，使用exports对象，分向外共享处理函数
const { addHandler, selectAllDataHandler, selectDataHandler, editDataHandler, delDataHandler } = require('../../router_handler/profiles');


// 添加接口
router.post("/add", addHandler)
// 查询所有数据接口
router.post("/selectAllData", selectAllDataHandler)
// 查询单个数据接口
router.post("/selectData", selectDataHandler)
// 编辑数据接口
router.post('/editData', editDataHandler)
// 删除数据接口
router.post('/delData', delDataHandler)


module.exports = router;