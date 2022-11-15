const path = require('path')

// 使用path.join()方法，可以把多个路径片段拼接为完整的路径字符串：
// 今后凡是涉及到路径拼接的操作，都要使用path.join()方法进行处理，不要直接使用 + 进行字符串拼接
const pathStr = path.join('a','/b/c','../','./d','/e'); // 输出\a\b\d\e，../会消除上一个路径，所以/c并没有出现

const pathStr2 = path.join(__dirname , '/chengji.txt'); // 输出当前文件所在目录的/chengji.txt，等同于__dirname + '/chengji.txt'，但是使用path.join()拼接更好

