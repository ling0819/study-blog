let fs = require('fs');
let EventEmitter = require('events');
class ReadStream extends EventEmitter {
    constructor(path, options={}) {
        super();
        this.path = path;
        this.flags = options.flags || 'r';
        this.mode = options.mode || 438;
        this.start = options.start || 0;
        this.end = options.end;
        this.autoClose = options.autoClose || true;
        this.highWaterMark = options.highWaterMark || 64*1024;
        this.encoding = options.encoding || null;
        // 默认非流动模式
        this.flowing = null;

        this.pos = this.start;

        // 读取文件
        this.open();

        this.open('newListener', (type) => {
            if (type === 'data') {
                this.flowing = true;
                this.read();
            }
        })
        
    }


    open() {
        fs.open(this.path, this.flags, (err, fd) => {
            if (err) {
                this.emit('error');
                return;
            }

            this.fd = fd; // 当前文件描述符 number
            this.emit('open', this.fd);

        })
    }

    read() {
        // 默认第一次 read方法拿不到fd 这里使用onece绑定 触发open后再次read
        if (typeof this.fd !== 'number') {
            return this.once('open', () => {this.read()})
        }
        // highWaterMark每次读取的个数
        // 默认没有end 每次读取highWaterMark  如果有end 需要计算每次读多少
        let readNum = this.end ? Math.min((this.end - this.pos +1), this.highWaterMark) : this.highWaterMark;
        let buffer = Buffer.alloc(this.highWaterMark);
        fs.read(this.fd, buffer, 0, buffer.length, this.pos, (err, bytesRead) => {
            if (bytesRead > 0) {
                this.pos += bytesRead;
                this.emit('data', this.encoding? buffer.toString(this.encoding) : buffer);
                if (this.flowing) {
                    this.read();
                }
            } else {
                this.emit('end');
                if (this.autoClose) {
                    fs.close(this.fd, () => {
                        this.emit('close');
                        this.flowing = null;
                    })
                }

                
                
            }
        })
    }
}

module.exports = ReadStream;