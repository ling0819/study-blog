let fs = require('fs');
let path = require('path');

// 这个方法会导致内存不足，直接会读入内存中
// 读取时候默认格式是buffer
let r = fs.readFileSync(path.resolve(__dirname, './1.txt'), 'utf8');

// 写入时候不给编码就是utf8
fs.writeFileSync(path.resolve(__dirname, './1.txt'), '啦啦');

// 拷贝文件
function copy() {
    fs.readFile(path.resolve(__dirname, './1.txt'), (err, data) => {
        fs.writeFile(path.resolve(__dirname, './name.txt'), r, (err) => {
            console.log('写入成功');
        })
    })
}

copy();