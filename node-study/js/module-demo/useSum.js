let r = require('./sum');
// let path = require('path');
// let fs = require('fs');

console.log(r(1,3));
// console.log(path.basename('1.js', '.js')) // 1
// console.log(path.extname('1.min.js')) // .js
// console.log(path.join('a', 'b')); //'a/b'



// let file = fs.readFileSync(path.resolve(__dirname, 'sum.js'), 'utf8');
// console.log(file);

// // 如何让一个字符串执行 eval / new function

// // eval的执行环境是不干净的 会查找上下文
// // 前端模块化使用eval 但是node模块化不使用这个
// // let a = 1;
// // eval('console.log(a)');

// // 不能实现node模块
// let a = 'var a = 1; return x+y+e';
// // 最后一个参数是函数体 前面的参数是函数的形参
// let fn = new Function('x', 'y', 'e', a);
// console.log(fn(1,2,3));

let vm = require('vm'); // 沙箱环境
