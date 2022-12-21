// 该文件对应：15使用express编写接口.js
const express = require('express');
const router = express.Router();

// 在这里挂载对应的路由
router.get('/index', (req, res) => {
    // 通过req.query获取客户端通过查询字符串，发送到服务器的数据
    const data = req.query;
    // console.log(req);
    // 调用res.send()方法，向客户端响应处理的结果
    res.send({
        state: 0,    // 0表示处理成功，1表示处理失败
        methods: '这是GET请求',
        data,   // 需要响应给客户端的数据
    })
})

// 定义post接口
router.post('/login', (req, res) => {
    // 获取客户端发送到服务器的数据
    const body = req.body;
    console.log(body);
    // 调用res.send()方法，向客户端响应处理的结果
    res.send({
        state: 0,    // 0表示处理成功，1表示处理失败
        methods: '这是POST请求',
        data: body,   // 需要响应给客户端的数据
    })
})


/**
 * 
 * 如果未使用cors()解决跨域，非GET/POST/HEAD请求方法，
 * 
 */
// 具体原因分析：https://www.itxm.cn/post/47161.html
router.post('/myPost', (req, res) => {
    // 也可在响应头中设置一个允许的header
    res.setHeader("Access-Control-Allow-Origin","*")
    res.setHeader('Access-Control-Allow-Headers','*');
    // 获取客户端发送到服务器的数据
    const body = req.body;
    console.log(body);
    // 调用res.send()方法，向客户端响应处理的结果
    res.send({
        state: 0,    // 0表示处理成功，1表示处理失败
        methods: '这是POST请求',
        data: body,   // 需要响应给客户端的数据
    })
})



router.options('/myPost', (request,response) => { 
    response.setHeader("Access-Control-Allow-Origin","*") 
    response.setHeader("Access-Control-Allow-Headers", "*"); 
    response.end() 
})

module.exports = router;