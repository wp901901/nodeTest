const express = require('express');
const app = express();
// https://www.bilibili.com/video/BV1R341167Fw?p=3&spm_id_from=pageDriver&vd_source=81d57cf597c0e7a00c33990ece51e281
const port = process.env.PORT || 3000;
// 导入路由模块
const users = require('./routers/api/user');

// 使用中间件注册路由模块
app.use('/api/users',users)

app.get('/',(req,res)=>{
    res.send('ok')
})

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
})
