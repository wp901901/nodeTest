const fs = require('fs');
const path = require('path');
// 匹配<style></style>标签的正则
// 其中\s 表示空白字符，\S表示非空白字符； *表示匹配任意次
const regStyle = /<style>[\s\S]*<\/style>/;
// 匹配<script></script>标签的正则
const regScript = /<script>[\s\S]*<\/script>/;

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

// 处理css的方法
function resolveCss(htmlStr){
    // 使用正则提取页面中的<style></style>标签
    const reg = regStyle.exec(htmlStr);
    // 将提取出来的样式字符串，做近一步处理
    const replaceStr = reg[0].replace('<style>','').replace('</style>','');
    // fsWriteFile(path.join(__dirname,'./clock/index.css'),replaceStr)
}

// 处理js的方法
function resolveJs(htmlStr){
    // 使用正则提取页面中的<script></script>标签
    const reg = regScript.exec(htmlStr);
    // 将提取出来的js字符串，做近一步处理
    const replaceStr = reg[0].replace('<script>','').replace('</script>','');
    fsWriteFile(path.join(__dirname,'./clock/index.js'),replaceStr)
    // console.log(reg[0]);
}

// 处理html的方法
function resolveHtml(htmlStr){
    const replaceLabel = htmlStr.replace(regScript,'<script src="./index.js"></script>').replace(regStyle,'<link rel="stylesheet" href="./index.css">')
    fsWriteFile(path.join(__dirname,'./clock/index.html'),replaceLabel)
}



console.log(path.join(__dirname,'./素材/index.html'));

let timeHtml = fsReadFile(path.join(__dirname,'./素材/index.html'));
resolveCss(timeHtml)
resolveJs(timeHtml)
resolveHtml(timeHtml)
console.log();