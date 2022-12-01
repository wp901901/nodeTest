const express = require('express');

const app = express();

/**
 * express 提供了一个非常好用的函数，叫做express.static()，通过它，可以非常方便的创建一个静态资源服务器
 * 
 * express在指定的静态目录中查找文件，并对外提供资源的访问路径，因此存放静态文件的目录名不会出现在URL中
 */

// 在这里，调用express.static()方法，快速的对外提供静态资源
// 如果需要托管多个静态资源，则需要多次调用express.static()，并且会根据目录的添加顺序查找所需的文件
// 比如：clock和file中都有一个index.html，此时clock先被添加，那么则会去访问clock文件中的index.html文件
// app.use(express.static('./clock'))
app.use(express.static('./file'))
// 此时使用http://127.0.0.1/index.html即可访问clock文件中的index.html
app.use(express.static('clock'))

/**
 * 如果希望在托管的静态资源访问路径之前路径之前挂载路径前缀，
 * 上面使用clcok加载的index文件并不需要http://127.0.0.1/clock/index.html去访问，直接使用http://127.0.0.1/index.html即可访问clock文件中的index.html
 * 如果需要前缀，则可以使用如下方式
 */
app.use('/public',express.static('public'))
// 此时必须使用http://127.0.0.1/public/index.html才可访问public文件中的index.html



app.listen(80, () => {
    // 使用nodemon 03托管静态资源  命令执行，则会自动热更新文件
    console.log('express server run at http://127.0.0.1');
})