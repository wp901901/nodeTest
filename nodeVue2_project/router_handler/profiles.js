/**
 * 在这里定义和用户相关的路由处理函数，供 /router/profile.js 模块进行调用
 */

// 引入数据库操作模块
const db = require('../db/mysqlDB')
// 用户数据库名字
const dbProfile = 'profile';

// 添加的处理函数
function addHandler(req, res) {
    // 定义插入语句
    const insertSql = `INSERT INTO ${dbProfile} SET ?`;
    const { type, describe, income, expend, cash, remark } = req.body;
    if (!req.body.type) { return res.cc('type值为空',5003) }
    db.query(insertSql, { type, describe, income, expend, cash, remark }, (err, result) => {
        // 执行SQL语句失败
        if (err) {
            // return res.send({ status: 1, message: err.message })
            return res.cc(err.message,5003)
        }
        if (result.affectedRows !== 1) {
            return res.cc('添加信息失败，请稍后再试！',5001)
        }
        res.cc('操作成功！', 200)
    })
}

// 查询所有数据的处理函数
function selectAllDataHandler(req, res) {
    const selSql = `SELECT * FROM ${dbProfile}`;
    db.query(selSql, (err, result) => {
        // 执行SQL语句失败
        if (err) {
            // return res.send({ status: 1, message: err.message })
            return res.cc(err.message,5003)
        }
        res.cc('操作成功', 200,{ result })
    })
}

// 查询单个数据的处理函数
function selectDataHandler(req, res) {
    const { id } = req.body;
    const selSql = `SELECT * FROM ${dbProfile} WHERE id = ?`;
    db.query(selSql, [id], (err, result) => {
        // console.log(result);
        // 执行SQL语句失败
        if (err) {
            return res.cc(err.message,5003)
        }
        if (result.length !== 1) {
            return res.cc('查询错误，请稍后再试！',5001)
        }
        res.cc('操作成功', 200,{ result })
    })
}

// 编辑数据的处理函数
function editDataHandler(req, res) {
    const updateSql = `UPDATE ${dbProfile} SET ? WHERE id = ?`;
    db.query(updateSql, [req.body, req.body.id], (err, result) => {
        // 执行SQL语句失败
        if (err) {
            return res.cc(err.message,5003)
        }
        if (result.affectedRows != 1) { return res.cc('更新用户信息失败',5001) }
        res.cc('更新成功', 200)
    })
}

// 删除数据的处理函数
function delDataHandler(req, res) {
    const delSql = `DELETE FROM ${dbProfile} WHERE id = ?`;
    db.query(delSql, [req.body.id], (err, result) => {
        // 执行SQL语句失败
        if (err) {
            return res.cc(err.message,5003)
        }
        if (result.affectedRows === 1) {   // affectedRow表示受影响的行数，只插入了一条数据，所以这里的值为1
            res.cc('删除数据成功', 200)
        }
    })
}




module.exports = {
    addHandler,
    selectAllDataHandler,
    selectDataHandler,
    editDataHandler,
    delDataHandler
}