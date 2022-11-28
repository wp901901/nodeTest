// 导入相关模块
const fs = require('fs');
const path = require('path');
const http = require('http');


// 读取内容的方法
function fsReadFile(path, encoding = 'utf8') {
    // 同步方法
    const fileContent = fs.readFileSync(path, encoding);
    return fileContent;
}

// 写入内容的方法
function fsWriteFile(file,data){
    const writeFile = fs.writeFileSync(file,data);
    return writeFile
}


// 创建基本的服务器
const server = http.createServer();
// 监听web服务器的request事件
server.on('request', (req, res) => {
    // 获取到客户端请求的url地址
    // /clock/index.html
    // /clock/index.css
    // /clock/index.js
    if(req.url!=="/favicon.ico") return
    const { url } = req;
    const fpath = path.join(__dirname,url);
    const content = fsReadFile(fpath);
    // res.setHeader("Content-Type","text/html; charset=utf-8")
    res.end(content) 
    // console.log(content);
    // console.log('hello');
})

// 启动服务器
server.listen(8080, () => {
    console.log('start');
})