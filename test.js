const { dateFormat,htmlUnEscape,htmlEscape } = require('./npm包/my-npmpage');

console.log(dateFormat(new Date()));

const htmlstr = '<h1 title="abc">这是h1标签<span>123&nbsp;</span></h1>';
const htmlstr2 = htmlEscape(htmlstr);
console.log(htmlEscape(htmlstr));
console.log(htmlUnEscape(htmlstr2));