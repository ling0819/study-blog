// 读写文件
let fs = require('fs');
let path = require('path');

// r 读取  w写入  r+ w+   
// mode权限  读取4 写入2 执行1  chomd -R 777 八进制     438就是八进制666
let buffer = Buffer.alloc(3);
fs.open(path.resolve(__dirname, './name.txt'), 'r', 438, (err, fd) => {
    //fd 文件描述符 buffer读取到内存 0 buffer偏移量  3一次读取的长度  1文件的读取位置
    fs.read(fd, buffer, 0, 3, 2, (err, bytesRead) => { //bytesRead实际读取到的个数
        console.log(buffer.toString())
    })
})

let buffer1 = Buffer.from('你好');
fs.open(path.resolve(__dirname, './name2.txt'), 'w+', (err, fd) => {
    //fd 文件描述符 buffer读取到内存  3当前写入的buffer的位置  buffer里选几个写入  0 写入文件的位置
    fs.write(fd, buffer1, 3, 3, 0, (err, byteWritten) => {

    })
})