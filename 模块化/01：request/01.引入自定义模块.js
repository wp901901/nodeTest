// 使用require加载其他模块时，会执行被加载模块中的代码
const testRequire = require('./自定义引入模块测试文件');
console.log(testRequire);