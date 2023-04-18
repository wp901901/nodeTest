// 导入mysql模块
const mysql = require('mysql');

// 创建数据库连接对象
const db = mysql.createPool({
    host:'127.0.0.1',   // 要链接哪个数据库
    user:'',    // 数据库账户名
    password:'',    // 数据库密码
    database:'',    // 
})

// 向外共享db数据库连接对象
module.exports = db;