// 拷贝文件了 比较low的方法
let fs = require('fs');
let path = require('path');
/**
 * @param  {} source 读取目标文件
 * @param  {} target 写入目标文件
 */
function copy(source, target) {
    // 声明一个缓存区
    let buffer = Buffer.alloc(3);
    // 声明读取偏移量
    let pos = 0;

    fs.open(source, 'r', (err, rfd) => {
        fs.open(target, 'w', (err, wfd) => {
            function next() {
                fs.read(rfd, buffer, 0, 3, pos, (err, readByte) => {
                    console.log(buffer.toString());
                    if(readByte > 0) { // 如果有内容就写入
                        pos += readByte;
                        console.log(readByte.toString())
                        fs.write(wfd, buffer, 0, readByte, (err, written) => {
                            next();
                        })
                    } else {
                        fs.close(rfd, () => {});
                        fs.close(wfd, ()=> {});
                    }
                })
            }
            next();
        })
    })
}

copy(path.resolve(__dirname, './name.txt'), path.resolve(__dirname, './name3.txt'));