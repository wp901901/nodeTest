const express = require('express');
const app = express()

/**
 * 需求：
 *  手动模拟一个类似于express.urlencoded这样的中间件，来解析POST提交到服务器的表单数据
 * 
 * 实现步骤：
 *  1：定义中间件
 *  2：监听req的data事件
 *  3：监听req的end事件
 *  4：使用querystring模块解析请求体数据
 *  5：将解析出来的数据对象挂载为req.body
 *  6：将自定义中间件封装为模块
 */

app.listen(80, () => {
    console.log('express server run at http://127.0.0.1');
})