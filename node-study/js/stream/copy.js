let fs = require('fs');
let {Readable, Writable, Duplex, Transform} = require('stream');


// 父类会调用子类的_read方法
// http基于流的req.on('data')
// class MyReadStream extends Readable {
//     constructor() {
//         super();
//         this.index = 8;
//     }
//     // fs.createReadStream 重写了_read方法
//     _read() {
//         if (this.index-- == 0) {
//             return this.push(null);
//         }

//         this.push(this.index + '');
//     }
// }

// let rs = new MyReadStream();
// rs.on('data', function(chunk){
//     console.log(chunk);
// })




// let rs = fs.createReadStream('./1.txt');
// let ws = fs.createWriteStream('./3.txt');

// fs.readFile 不能处理大文件
// 不能控制中间的流程
// rs.pipe(ws);



// ws.write('123');
// ws.end('123'); 会强制把内存中的数据清空 并且关闭文件   文件已关闭就不能继续写入 如果end中有参数就会继续调用write方法  fs.close
// ws.end();


// class MyWriteStream extends Writable {  // 子类实现可写流方法
//     _write(chunk, encoding, clearBuffer) {
//         fs.appendFile('./1.txt', chunk, () => {
//             setTimeout(() => {
//                 clearBuffer();
//             }, 1000)
//         })
//     }
// }

// let ws = new MyWriteStream();
// ws.write('1');
// ws.write('2');


// 双工流 可读可写 duplex _read _write放的自己的方法  
// dulpex util.inherits(Duplex ,Readable)继承可读可写流
// class MyDuplex extends Duplex {
//     _read() {
//         console.log('read');
//     }


//     _write() {
//         console.log('write');
//     }
// }

// let rw = new MyDuplex();
// rw.on('data', () => {

// })

// rw.write('1');


// rs.pipe()
// 压缩 gzip 先把数据读出来 => 转换 => 写入一个新的文件

// class MyTransform extends Transform {
//     _transform(chunk, encoding, callback) {
//         this.push('111');
//         this.push(null);
//         console.log(chunk, 'write');
//         callback();
//     }
// }

// let tr = new MyTransform();
// tr.on('data', (data) => {
//     console.log(data);
// })
// tr.write('1234');

// 进程 console.log
// 只有可以write的就是可写流 可以on 'data'的就是可读流
// process.stdout.write('111');
// process.stdin.on('data', (chunk) => {
//     console.log(chunk)
// })

// 转大小写
class MyTransform extends Transform {
    _transform(chunk, encoding, callback) { //读取到之后转换，再写入
        this.push(chunk.toString().toUpperCase());
        callback();
    }
}

let tr = new MyTransform();

process.stdin.pipe(tr).pipe(process.stdout);