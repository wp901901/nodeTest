// 在一个自定义模块中，默认情况下，module.exports = {}

const age = 20;

// 向module.exports对象上挂载username属性
module.exports.username = 'pyy';

// 向module.exports对象上挂载sayHello方法
module.exports.sayHello = function(){
    console.log('hello');
}

module.exports.age = age;

// 让module.exports指向一个全新的对象，以上添加的属性和方法则会被全部覆盖掉
module.exports = {
    nickName:'彭于晏',
    sayHi(){
        console.log('hi!');
    }
}