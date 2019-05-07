let fs = require('fs');
let WrietStream = require('./WriteStream');

let ws = new WrietStream('./2.txt', {
    flag: 'w',
    mode: 0o666,
    autoClose: true,
    encoding: 'utf8',
    highWaterMark: 4 //预期使用的内存 每次写入的内存 64 * 1024
})

// 可写流 （open close）文件   write end on('diran')
// 写入过程是异步的

// 写入的内存只能是string或者buffer
// flag并不表示能否写入成功



// 多个写入操作时候，会一个一个写入，其他的写入会先放入内存中 
// 如果flag为flase 就用继续写入 不然文件会超出预期大小 占用过多内存  
// 当预计的大小和写入的大小相等或者大于预计的大小 会触发drain

// 写入 => 超出或者等于预期使用内存大小 停止写入 => drain  => 继续写入

let i = 8;
function write() {
    let flag = true;
    while(i && flag) {
        flag = ws.write(i-- + '');
        console.log(flag);
    }
}
write();

ws.on('drain', () => {
    console.log('drain');
    write();
})