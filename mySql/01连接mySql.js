// 引入mysql模块
const mysql = require('mysql');

// 建立mysql连接
const db = mysql.createPool({
    host: '127.0.0.1',   // 数据库的IP地址
    user: 'root',    // 登录数据库的账号
    password: 'admin123',    // 登录数据库的密码
    database: 'my_db_01'     // 指定要操作哪个数据
})

// 测试数据库连接
// db.query('SELECT 1',(err,result)=>{
//     if(err) {
//         console.log(err.message);
//         return
//     }

//     console.log('result',result);
// })

// 查询users表中的数据
db.query('SELECT * FROM users', (err, result) => {
    if (err) {
        console.log(err.message);
        return
    }
    // 查询数据成功
    // 如果执行的是SELECT查询语句,则执行的结果是数组
    console.log('result', result);
})

// 插入数据
// 要插入到users表中的数据对象
// const user = { username: 'XY-PYY', password: 'a11111' };
// // 定义待执行的SQL语句（问号表示占位符）（SQL语句不区分大小写）
// const sqlStr = 'INSERT INTO users (username,password) values(?,?)';
// // 执行插入SQL语句
// db.query(sqlStr,[user.username,user.password],(err,result)=>{
//     if (err) {
//         console.log(err.message);
//         return
//     }
//     // 成功了
//     // 注意：如果执行的insert into插入语句，这result是一个对象
//     console.log('result', result);
//     // 可以通过affectedRows属性来判断是否插入数据成功
//     if(result.affectedRows === 1){   // affectedRows表示受影响的行数，只插入了一条数据，所以这里的值为1
//         console.log('插入数据成功');
//     }
//     // result打印出来的值
//     // result OkPacket {
//     //     fieldCount: 0,
//     //     affectedRows: 1,  // 受影响的行数
//     //     insertId: 19, // 新插入的ID
//     //     serverStatus: 2,
//     //     warningCount: 0,
//     //     message: '',
//     //     protocol41: true,
//     //     changedRows: 0
//     // }
// })

// 快捷插入数据的便捷操作
// 像表中新增数据时，如果数据对象的每个属性和数据表的字段一一对应，则可以通过如下方式快速插入数据：
// const user1 = { username: 'XY-WYZ', password: 'a11111' };
// // 待执行的SQL语句，其中英文的 ? 表示占位符
// const userStr1 = 'INSERT INTO users SET ?'
// // 直接将数据对象当做占位符的值
// db.query(userStr1, user1, (err, result) => {
//     if (err) {
//         console.log(err.message);
//         return
//     }
//     // 成功了
//     // 注意：如果执行的insert into插入语句，这result是一个对象
//     console.log('result', result);
//     // 可以通过affectedRows属性来判断是否插入数据成功
//     if (result.affectedRows === 1) {   // affectedRow表示受影响的行数，只插入了一条数据，所以这里的值为1
//         console.log('插入数据成功');
//     }
// })

// 更新操作
const upUser = { username: 'XY-WJ', password: 'hello2023', id: 3 };
// UPDATE users SET `username` = 'whereTest',`password` = '000000',`status` = 1 WHERE id = 14
const upSqlStr = 'UPDATE users SET username = ?, password = ? WHERE id = ?'

// 执行操作
db.query(upSqlStr,[upUser.username,upUser.password,upUser.id],(err, result) => {
    if (err) {
        console.log(err.message);
        return
    }
    // 注意：执行了 update 语句之后，执行的结果，也是一个对象，可以通过 affectedRows 判断是否更新成功
    console.log('result', result);
    if (result.affectedRows === 1) {   // affectedRow表示受影响的行数，只插入了一条数据，所以这里的值为1
        console.log('更新数据成功');
    }
})