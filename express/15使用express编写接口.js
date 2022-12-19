const express = require('express');
const app = express();
// const cors = require('cors');
const router = require('./express-router/apiRouter');

// 通过express.json()这个中间件，解析表单中的JSON格式的数据
app.use(express.json())

/**
 * 创建JSONP接口的注意事项
 *  如果项目中已经配置了CORS跨域资源共享，为了防止冲突，必须在配置CORS中间件之前声明JSONP的接口
 *  否则JSONP接口会被处理成开启了CORS的接口，示例代码如下：
 */

// 优先创建JSONP接口（这个接口不会被处理成CORS接口）
app.get('/api/jsonp', (req, res) => {
    // 1：获取客户端发送过来的回调函数的名字
    const funcName = req.query.callback;
    // 2：得到要通过JSONP形式发送给客户端的数据
    const data = { name: 'zs', age: 22 };
    // 3：根据前两步得到的数据，拼接出一个函数调用的字符串
    const scriptStr = `${funcName}(${JSON.stringify(data)})`
    // 4：把上一步拼接得到的字符串，响应给客户端的<script>标签进行解析执行
    res.send(scriptStr)
})

/**
 * 使用cors中间件解决跨域问题
 * cors 是express的一个第三方中间件，通过安装和配置cors中间件，可以很方便的解决跨域问题
 * 1:使用npm install cors 安装中间件
 * 2:const cors = require('cors')导入中间件
 * 3:在路由之前调用app.use(cors())配置中间件
 */
// 再配置CORS中间件（后续的所有接口，都会被处理成CORS接口）
// app.use(cors())


app.use('/api', router)




app.listen(80, () => {
    console.log('express server run at http://127.0.0.1');
})