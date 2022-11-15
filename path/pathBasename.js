const path = require('path');
const fpath = '/a/b/c/index.html';  // 文件的存放路径

const fullName = path.basename(fpath);
console.log(fullName);  // index.html

// 第二个参数：可选的文件拓展名
const nameWithoutExt = path.basename(fpath,'.html');
console.log(nameWithoutExt);    // index