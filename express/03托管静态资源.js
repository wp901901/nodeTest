const express = require('express');

const app = express();

/**
 * express 提供了一个非常好用的函数，叫做express.static()，通过它，可以非常方便的创建一个静态资源服务器
 * 
 * express在指定的静态目录中查找文件，并对外提供资源的访问路径，因此存放静态文件的目录名不会出现在URL中
 */

// 在这里，调用express.static()方法，快速的对外提供静态资源
// 如果需要托管多个静态资源，则需要多次调用express.static()
// app.use(express.static('./clock'))
app.use(express.static('clock'))

app.listen(80,()=>{
    console.log('express server run at http://127.0.0.1');
})