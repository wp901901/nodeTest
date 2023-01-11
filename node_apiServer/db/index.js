// 导入mysql模块
const mysql = require('mysql');

// 创建数据库连接对象
const db = mysql.createPool({
    host:'127.0.0.1',   // 要连接哪个数据库，这里连接的当前本机的数据库
    user:'root',    // 数据库账户名
    password:'admin123',    // 数据库密码
    database:'my_db_01',    // 通过database属性指定操作哪一个数据库
})

// 向外共享db数据库连接对象
module.exports = db;