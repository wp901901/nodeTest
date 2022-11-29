/**
 * 默认情况下，exports和module.exports指向同一个对象。
 * 但是，require()模块时，得到的永远是module.exports指向的对象
 * 为了防止混乱，建议大家不要在同一个模块中同时使用exports和module.exports！！
 */

// 案例1：
exports.username = 'zs';
module.exports = {
    gender:'男',
    age:22
}
// 案例1使用require()引入时，输出的是{gender:'男',age:22}
// 原因：require()模块时，得到的永远是module.exports指向的对象

// ----------------------------------------------------


// 案例2：
module.exports.username = 'zs';
exports = {
    gender:'男',
    age:22
}
// 案例2使用require()引入时，输出的是{username:'zs'}
// 原因：require()模块时，得到的永远是module.exports指向的对象

// ----------------------------------------------------

// 案例3:
exports.username = 'zs';
module.exports.gender = '男';
// 案例3使用require()引入时，输出的是{username:'zs',gender:'男'}
// 原因：module.exports和exports对象此时都指向同一个对象，相当于往同一个对象中添加属性

// ----------------------------------------------------

// 案例4：
exports = {
    username:'zs',
    gender:'男'
}

module.exports = exports;
module.exports.age = '22';
// 案例4使用require()引入时，输出的是{username:'zs',gender:'男',age:22}
// 原因：module.exports的对象引入指向了exports，此时module.exports和exports对象都指向同一个对象，相当于往同一个对象中添加属性


