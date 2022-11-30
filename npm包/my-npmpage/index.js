const { dateFormat } = require('./src/dateFormat');
const { htmlUnEscape,htmlEscape } = require('./src/htmlEscape');


// 向外暴露需要的成员
module.exports = {
    dateFormat,
    htmlEscape,
    htmlUnEscape
}