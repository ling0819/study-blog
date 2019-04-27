// 声明一个buffer 固定长度
let buffer = Buffer.alloc(5); //安全
console.log(buffer);


let buffer1 = Buffer.from('哈哈'); // 和字符串可以相互转换
console.log(buffer1);

// 0b 二进制  0八进制   0x16十六进制 
let buffer2 = Buffer.from([0x16])
console.log(buffer2);


// 16进制转二进制
console.log((0x10).toString(2));
console.log(parseInt('10000', 2)); //任意进制转化为10进制


// base64取代所有的url， 不会发起请求 速度快  小图标可使用
// 64怎么来的 一个汉字24bit 三个字节   3*8 = 4*6 拆成份数变化了 体积增大
// 只是编码转换

let buf = Buffer.from('好');
console.log(buf);  // e5 a5 bd
console.log((0xe5).toString(2));
console.log((0xa5).toString(2));
console.log((0xbd).toString(2));

// 11100101 10100101 10111101  8*3
// 111001 011010 010110 111101  6*4


console.log(parseInt('111001', 2))
console.log(parseInt('011010', 2))
console.log(parseInt('010110', 2))
console.log(parseInt('111101', 2))
// 57 26 22 61

// base64转换规则
let str = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase();
str += 'abcdefghijklmnopqrstuvwxyz';
str += '0123456789+/';
console.log(str[57]+str[26]+str[22]+str[61]);
// 5aW9

//buffer中放的都是内存 类似数组 浅拷贝slice
// buffer中的常用方法 slice 索引 length 长度 indexOf 静态方法

let buffers = Buffer.from('你好你好你好');
let r = buffers.indexOf('好');
console.log(r);

// split 自己封装一个
Buffer.prototype.split = function(sep) {
    let pos = 0;
    let length = Buffer.from(sep).length;
    let arr = [];
    let current;
    while((current = this.indexOf(sep, pos)) !== -1) {
        if(pos != current) {
            arr.push(this.slice(pos, current));
        }
        pos = current + length;
    }


    arr.push(this.slice(pos));
    return arr;
}

console.log(buffers.split('你').toString());