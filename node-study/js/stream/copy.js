let fs = require('fs');
let {Readable, Writable} = require('stream');


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


class MyWriteStream extends Writable {
    _write(chunk, encoding, callback) {
        console.log(chunk);
    }
}

let ws

