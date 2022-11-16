// 导入http模块
const http = require('http');
// 创建web服务器实例
const server = http.createServer();
// 为服务器实例绑定request事件，监听客户端的请求
server.on('request', (req,res) => {
    // req是请求对象，包含了与客户端相关的数据与属性
    // url是客户端请求的url地址，method是客户端请求的method类型
    // console.log(req);
    const { url } = req;
    // 1.获取请求的 ur1 地址const url = req.url
    // 2.设置默认的响应内容为 404 Not found
    let content = '<h1>404 Not found!</h1>';
    // 3.判断用户请求的是否为 / 或 /index.html 首页
    // 4.判断用户请求的是否为 /about.html 关于页面
    if(url === '/' || url === '/index.html'){
        content ='<h1>首页</h1>'
    }else if(url === '/about.html'){
        content = '<h1>关于页面</h1>'
    }
    // 5.设置 Content-Type 响应头，防止中文乱码
    res.setHeader('Content-Type','text/html; charset=utf-8');
    // 6.使用 res.end() 把内容响应给客户端
    res.end(content)
})
// 启动服务器
server.listen(8080, () => {
    console.log('server running at http://127.0.0.1:8080');
})