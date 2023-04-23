const express = require('express');
const router = express.Router();

// 引入数据库操作模块
const db = require('../../db/index')
// 用户数据库名字
const dbUsers = 'adminuser';
/**
 * 使用bbcryptjs对用户密码进行加密，
 *  优点：加密之后的密码，无法被逆向破解，
 *      同一明文密码多次加密，得到的加密结果各不相同，保证了安全性 
 */
const bcryptjs = require('bcryptjs')

// $route GET /api/users/index
// @desc 返回的请求的json数据
// @access public
router.get('/index', (req, res) => {
    res.json({ msg: '测试' })
})

// 注册接口
router.post("/register", (req, res) => {
    console.log(req.body);
    const selectSql = `SELECT * FROM ${dbUsers} WHERE email = ?`;
    const {email,name,password,avatar} = req.body;
    if(email || password){return res.cc('用户名或密码不能为空！',500)}
    db.query(selectSql, [req.body.email], (err, result) => {
        // 发生错误直接返回
        if (err) { return res.status(500).json({message:err.message}) }
        // 如果查询的长度不为0，说明已经有数据存在
        if (result.length) { return res.status(500).json({message:'该邮箱已被占用'}) }
        
        res.status(200).json({message:'该邮箱可以注册'})
    })
})


module.exports = router;