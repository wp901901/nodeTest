// 导入http模块
const http = require('http');
// 创建web服务器实例
const server = http.createServer();
// 为服务器实例绑定request事件，监听客户端的请求
server.on('request', (req, res) => {
    // req是请求对象，包含了与客户端相关的数据与属性
    // url是客户端请求的url地址，method是客户端请求的method类型
    // console.log(req);
    const { url, method } = req;
    // const str = `Your request url is ${url}, and request method is ${method}`
    // console.log(str);
    // res.end() 方法的作用:
    //向客户端发送指定的内容，并结束这次请求的处理过程
    // 为了防止中文显示乱码的问题，需要设置响应头Content-Type的值为text/html; charset=utf-8
    const str = '测试中文字符的发送';
    res.setHeader('Content-Type','text/html; charset=utf-8')
    res.end(str)
})
// 启动服务器
server.listen(8080, () => {
    console.log('server running at http://127.0.0.1:8080');
})