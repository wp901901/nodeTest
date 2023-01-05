// 导入 express 模块
const express = require('express')
// 创建 express 的服务器实例
const app = express()

// TODO_01：安装并导入 JWT 相关的两个包，分别是 jsonwebtoken 和 express-jwt
// 导入用于生成JWT字符串的包
const jwt = require('jsonwebtoken');
/**
 * JWT通常由三部分组成，分别是Header(头部)、Payload(有效载荷)、Signature(签名)
 * payload放的是用户信息，三者之间使用英文的“.”分隔
 */
// 导入用于将客户端发送过来的JWT字符串，解析还原成JSON对象的包
const { expressjwt } = require('express-jwt')

// 允许跨域资源共享
const cors = require('cors')
app.use(cors())

// 解析 post 表单数据的中间件
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

// TODO_02：定义 secret 密钥，建议将密钥命名为 secretKey
const secretKey = 'ICC-EddiePeng soCool'; // key值可以自定义

// TODO_04：注册将 JWT 字符串解析还原成 JSON 对象的中间件
/**
 * expressjwt({secret:secretKey}) 就是用来解析Token的中间件
 * .unless({path:[/^\/api\//]}) 用来指定哪些接口不需要访问权限
 */
// 注意：只要配置成功了express-jwt这个中间件，就可以把解析出来的用户信息，挂载到req.auth属性上(auth属性是express-jwt中间件生成的)
// 这个req.auth包含什么内容，是由jwt.sign中的第一个属性决定的，这里只配置了username，需要什么就在添加jwt.sign的第一个属性中添加什么
// 但是不要包含密码等敏感信息
app.use(expressjwt({ secret: secretKey, algorithms: ['HS256'] }).unless({ path: [/^\/api\//] }))

// 登录接口
app.post('/api/login', function (req, res) {
  // 将 req.body 请求体中的数据，转存为 userinfo 常量
  const userinfo = req.body
  // 登录失败
  // if (userinfo.username !== 'admin' || userinfo.password !== '000000') {
  //   return res.send({
  //     status: 400,
  //     message: '登录失败！'
  //   })
  // }
  // 登录成功
  // TODO_03：在登录成功之后，调用 jwt.sign() 方法生成 JWT 字符串。并通过 token 属性发送给客户端
  /**
   * 参数1：用户的信息对象
   * 参数2：加密的密钥
   * 参数3：配置对象，可以配置当前token的有效期，60s,1h等
  */
  const tokenStr = jwt.sign({ username: userinfo.username }, secretKey, { expiresIn: '60s' })
  console.log('tokenStr', tokenStr);
  res.send({
    status: 200,
    message: '登录成功！',
    token: tokenStr // 要发送给客户端的 token 字符串
  })
})

// 这是一个有权限的 API 接口
app.get('/admin/getinfo', function (req, res) {
  // TODO_05：使用 req.auth 获取用户信息，并使用 data 属性将用户信息发送给客户端
  // 需要在请求中添加Authorization:Bearer 拼接上上面接口返回的token，需要与Bearer间隔一个空格
  console.log(req.auth);
  res.send({
    status: 200,
    message: '获取用户信息成功！',
    data: req.auth // 要发送给客户端的用户信息
  })
})

// TODO_06：使用全局错误处理中间件，捕获解析 JWT 失败后产生的错误
app.use((err, req, res, next) => {
  // 这次错误是由token解析失败导致的
  if (err.name === 'UnauthorizedError') {
    return res.send({
      status: 401,
      message: '无效的token'
    })
  }
  // 其他错误
  return res.send({
    status: 500,
    message: '未知错误'
  })
})
// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(8888, function () {
  console.log('Express server running at http://127.0.0.1:8888')
})
