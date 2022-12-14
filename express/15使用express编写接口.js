const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./express-router/apiRouter');

// 通过express.json()这个中间件，解析表单中的JSON格式的数据
app.use(express.json())

/**
 * 使用cors中间件解决跨域问题
 * 
 * cors 是express的一个第三方中间件，通过安装和配置cors中间件，可以很方便的解决跨域问题
 * 
 * 1:使用npm install cors 安装中间件
 * 2:const cors = require('cors')导入中间件
 * 3:在路由之前调用app.use(cors())配置中间件
 */
app.use(cors())
app.use('/api',router)

app.listen(80, () => {
    console.log('express server run at http://127.0.0.1');
})