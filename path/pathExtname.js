const path = require('path')
// 使用path.extname方法，可以获取路径中的扩展名部分:
const fpath = '/a/b/c/index.html' // 路径字符串

const fext = path.extname(fpath)
console.log(fext) // 输出 .html