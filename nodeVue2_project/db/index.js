// 导入mysql模块
const mysql = require('mysql');

// 创建数据库连接对象
const db = mysql.createPool({
    host:'127.0.0.1',   // 要链接哪个数据库
    user:'',    // 数据库账户名
    password:'',    // 数据库密码
    database:'adminsql',    // 通过database属性指定操作哪一个数据库
})
// https://blog.csdn.net/H1519223775/article/details/127200632
// 向外共享db数据库连接对象
module.exports = db;