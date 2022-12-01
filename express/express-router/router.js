// 13:09

const express = require('express');
// 创建路由对象
const router = express.Router();

// 挂载路由，这里使用的是router.get
router.get('/user/list',(req,res)=>{
    res.send('router method:GET,url:/user/list');
})

router.post('/login/out',(req,res)=>{
    res.send('router method:POST,url:/login/out')
})

// 向外导出路由对象
module.exports = router;