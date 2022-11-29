// 默认情况下，exports和module.exports指向同一个对象。
// 但是最终共享的结果，还是以module.exports指向的对象为准

console.log(exports);   // {}

console.log(module.exports);    // {} 

console.log(exports === module.exports);     // true


const eObj = require('./exports对象引入文件');

console.log(eObj);