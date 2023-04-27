// 导入数据库模块
const mysql = require('mysql');

// 创建数据库连接对象
const db = mysql.createPool({
    host: '127.0.0.1',   // 要链接哪个数据库,
    user: 'root',    // 数据库账户名
    password: 'admin123',    // 数据库密码
    database: 'profile', // 要操作的数据库名
})

// 向外共享数据库链接对象
module.exports = db;