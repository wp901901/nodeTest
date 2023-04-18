const express = require('express');
const router = express.Router();

// $route GET /api/users/index
// @desc 返回的请求的json数据
// @access public
router.get('/index',(req,res)=>{
    res.json({msg:'测试'})
})


module.exports = router;