// 引入mysql模块
const mysql = require('mysql');

// ======================================建立mysql连接======================================
const db = mysql.createPool({
    host: '127.0.0.1',   // 数据库的IP地址
    user: 'root',    // 登录数据库的账号
    password: 'admin123',    // 登录数据库的密码
    database: 'my_db_01'     // 指定要操作哪个数据
})

// ======================================测试数据库连接======================================
// db.query('SELECT 1',(err,result)=>{
//     if(err) {
//         console.log(err.message);
//         return
//     }

//     console.log('result',result);
// })

// ======================================查询users表中的数据======================================
// db.query('SELECT * FROM users', (err, result) => {
//     if (err) {
//         console.log(err.message);
//         return
//     }
//     // 查询数据成功
//     // 如果执行的是SELECT查询语句,则执行的结果是数组
//     console.log('result', result);
// })

// ======================================插入数据======================================
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

// ======================================更新SQL操作======================================
const upUser = { username: 'XY-ZA', password: 'hello2023', id: 3 };
// UPDATE users SET `username` = 'whereTest',`password` = '000000',`status` = 1 WHERE id = 14
const upSqlStr = 'UPDATE users SET username = ?, password = ? WHERE id = ?';
const sqlName = 'users';
// 执行操作
// db.query(upSqlStr,[upUser.username,upUser.password,upUser.id],(err, result) => {
//     if (err) {
//         console.log(err.message);
//         return
//     }
//     // 注意：执行了 update 语句之后，执行的结果，也是一个对象，可以通过 affectedRows 判断是否更新成功
//     console.log('result', result);
//     if (result.affectedRows === 1) {   // affectedRow表示受影响的行数，只插入了一条数据，所以这里的值为1
//         console.log('更新数据成功');
//     }
// })

// 快捷更新数据的便捷操作
// 定义SQL语句
// const upSqlStr1 = `UPDATE ${sqlName} SET ? WHERE id = ?`
// // 执行便捷操作
// db.query(upSqlStr1,[upUser,upUser.id],(err, result) => {
//     if (err) {
//         console.log(err.message);
//         return
//     }
//     // 注意：执行了 update 语句之后，执行的结果，也是一个对象，可以通过 affectedRows 判断是否更新成功
//     console.log('result', result);
//     if (result.affectedRows === 1) {   // affectedRow表示受影响的行数，只插入了一条数据，所以这里的值为1
//         console.log('更新数据成功');
//     }
// })



// ======================================删除SQL操作======================================
// 要执行的SQL语句
const delSqlStr = 'DELETE FROM users WHERE id = ?';
/**
 * 调用db.query()执行SQL语句的同时，为占位符指定具体的值
 * 注意：
 *      如果SQL语句中有多个占位符，则必须使用数组为每个占位符指定具体的值
 *      如果SQL语句中只有一个占位符，则可以省略数组
 */
// db.query(delSqlStr,20,(err,result)=>{
//     if (err) {
//         console.log(err.message);
//         return
//     }
//     // 注意：执行了 delete 语句之后，执行的结果，也是一个对象，可以通过 affectedRows 判断是否更新成功
//     if (result.affectedRows === 1) {   // affectedRow表示受影响的行数，只插入了一条数据，所以这里的值为1
//         console.log('删除数据成功');
//     }
// })

// ======================================标记删除======================================
/**
 * 使用DELETE语句，会把真正的数据从表中删除掉，为了保险起见，推荐使用 标记删除 的形式，来模拟删除的动作
 * 所谓的标记删除，就是在表中设置类似于status这样的状态字段，来标记当前这条数据是否被删除
 * 当用户执行了删除的动作时，我们并没有执行DELETE语句把数据删除掉，而是执行了UPDATA语句，将这条数据对应的status字段标记删除即可
 */

const statusStr = 'status'; // 要更新的数据库字段名（列名）
const userName1 = 'users';  // 要操作的数据库表名
db.query(`UPDATE ${userName1} SET ${statusStr} = ? WHERE id = ?`,[1,3],(err,result)=>{
    if (err) {
        console.log(err.message);
        return
    }
    // 注意：执行了 update 语句之后，执行的结果，也是一个对象，可以通过 affectedRows 判断是否更新成功
    if (result.affectedRows === 1) {   // affectedRow表示受影响的行数，只插入了一条数据，所以这里的值为1
        console.log('标记删除数据成功');
    }
})