// 希望不会占用大量内存
let fs = require('fs');
// 使用模拟的可读流
let ReadStream = require('./ReadStream');


let rs = new ReadStream('./1.txt', {
    flags: 'r', // 打开文件做什么 r w r+ w+ ...
    highWaterMark: 1, // 每次读取一个字节 默认 64k
    mode: 0o666, // 可读可写
    start: 1, // 开始位置
    end: 4,   // 结束位置
    encoding: 'utf8',
    autoClose: true

});

rs.on('open', () => {
    console.log('文件打开')
})

rs.on('close', () => {
    console.log('文件关闭')
})

rs.on('error', () => {
    console.log('出错了')
})
// 默认可读流不会马上读取
// 默认非流动模式 => 流动模式
// 拼接使用buffer 使用str+可能会乱码   Buffer.concat(arr)

// rs.pause 暂停  rs.resume 继续
rs.on('data', (chunk) => {
    console.log(chunk);
})

rs.on('end', () => {
    console.log('读取完毕')
})