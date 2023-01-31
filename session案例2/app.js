const express = require('express');
const sessions = require('express-session')
const app = express();

app.use(express.json())
// 配置解析表单数据的中间件，注意：这个中间件只能解析application/x-www-form-urlencoded格式的表单数据
app.use(express.urlencoded({ extended: true }))

const username_DB = 'admin';
const password_DB = '123';

var session_DB;

app.use(sessions({
    secret: '彭于晏的签名', // 给session ID cookie签名
    name: 'ICC-EDdiePeng',   // 默认是connect.sid
    cookie: { maxAge: 15000 },
    resave: false,
    saveUninitialized: false
}))

app.get('/', (req, res) => {
    console.log('用户访问了网页');
    session_DB = req.session;
    if (session_DB.username) {
        res.send(
            `
                <h1>欢迎你来，${session_DB.username}</h1>
                <a href="/logout">登出</a>
            `);
    } else {
        res.sendFile(__dirname + '/index.html')
    }
})

app.post('/login', (req, res) => {
    if (req.body.username === username_DB && req.body.password === password_DB) {
        session_DB = req.session;
        session_DB.username = req.body.username;
        console.log('服务器生成新的Session对象:');
        console.log(req.session);
        console.log(`当前的唯一会话ID，藏在cookie里的value: ${req.sessionID}`);
        res.send(
            `
                <h1>欢迎你来，${session_DB.username}</h1>
                <a href="/logout">登出</a>
            `);
    } else {
        res.send('用户名或者密码——错误')
    }
})

app.get('/logout', (req, res) => {
    req.session.destroy();  // 清除服务器session
    console.log(`用户登出网页后，当前服务器的session内容为：${req.session}`);
    res.redirect('/')
})

app.listen('3838', () => console.log('3838 running'))