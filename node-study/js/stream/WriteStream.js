let fs = require('fs');
let Events = require('events');


class WriteStream extends Events {
    constructor(path, options) {
        super();
        this.path = path;
        this.flags = options.flags || 'w';
        this.mode = options.mode || 438;
        this.start = options.start || 0;
  
        this.autoClose = options.autoClose || true;
        this.highWaterMark = options.highWaterMark || 64*1024;
        this.encoding = options.encoding || 'utf8';
        // 链表存储
        this.cache = []; // 缓存多次写入的数据
        // 维护写入的长度
        this.len = 0;

        this.needDrain = false;

        // 如果正在写入 就放在缓存中
        this.writing = false;

        // 写入的位置
        this.pos = this.start;

        this.open();
    }


    open() {
        fs.open(this.path,this.flags, (err, fd) => {
            if (err) {
                return this.emit('error');
            }

            this.fd = fd;
            this.emit('open');
        })
    }


    write(chunk, encoding=this.encoding, callBack=()=>{}) {
        // 第一次真正向文件中写入 之后放到内存中
        // 转buffer
        chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)
        this.len += chunk.length;
        // 返回结果

        if (this.len >= this.highWaterMark) { // 清空后需要出发drain事件
            this.needDrain = true;
        }

        if (this.writing) {
            this.cache.push({
                chunk,
                encoding,
                callBack
            })
        } else {
            this.writing = true;
            this._write(chunk, encoding, () => {
                callBack();
                this.clearBuffer(); //清理数组第一项
            });
        }

        return !this.needDrain;
      
    }

    _write(chunk, encoding, callBack) {
        if (typeof this.fd !== 'number') {
            return this.once('open', () => this._write(chunk, encoding, callBack))
        }
        // 写入时，可以不用加pos
        fs.write(this.fd, chunk, 0, chunk.length, this.pos, (err, written) => {
            this.pos += written;
            this.len -= written;  // 每次写入成功后 减少缓存大小 
            callBack();
        })
    }


    clearBuffer() {
        let data = this.cache.shift();
        if (data) {
            this._write(data.chunk, data.encoding, () => {
                data.callBack();
                this.clearBuffer();
            });
        } else { // 缓存已清空 需要出发drain
            this.needDrain = false;
            this.writing = false;
            this.emit('drain');
             // 不是正在写入了 下次写入时候第一个写入文件 剩下的放入缓存
        }
    }
}

module.exports = WriteStream;