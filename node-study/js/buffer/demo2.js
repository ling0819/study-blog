let buffer = Buffer.from("你好");

console.log(Buffer.isBuffer(buffer)); // 判断是不是buffer

// 实现concat, copy
// 拼接数据 tcp http 需要把多个buffer拼接在一起
let buffer1 = Buffer.from("你好");
let buffer2 = Buffer.from("世界");

// let bigBuffer = Buffer.alloc(12);
Buffer.prototype.copy = function(target, targetStart, sourceStart=0, sourceEnd=this.length) {
    for (let i=0; i<sourceEnd-sourceStart; i++) {
        target[targetStart+i] = this[sourceStart+i];
    }
}
// /**
//  * @param  {} bigBuffer 目标Buffer
//  * @param  {} 0   目标的拷贝位置
//  * @param  {} 0   源的开始位置
//  * @param  {} 6   源的结束位置
//  */
// buffer1.copy(bigBuffer, 0, 0, 6)
// buffer2.copy(bigBuffer, 6);
// console.log(bigBuffer.toString())


// concat  node原有方法  

Buffer.concat = function(list, totalLength=list.reduce((a, b) =>(a+b.length),0)) {
    let buffer = Buffer.alloc(totalLength);
    let offset = 0;
    list.forEach(buff=> {
        buff.copy(buffer, offset);
        offset += buff.length;
    })

    return buffer;
}

// 常用方法 isBuffer toString Buffer.concat split
console.log(Buffer.concat([buffer1, buffer2], 100).toString());
