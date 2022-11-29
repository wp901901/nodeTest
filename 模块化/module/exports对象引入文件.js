const username = '张三';

module.exports.tit = '我是module.exports导出的';

exports.username = username;

exports.age = 18;

exports.sayHello = function(){
    console.log('hello');
}

// 最终，向外共享的结果，永远都是module.exports所指向的对象