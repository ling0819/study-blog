## 文件操作和读写 基于(fs.read fs.write) 异步读写

#### 可读流
可以读流读取的时候会先将内容读取到预先定义好的内存空间中，然后执行读取, 每次只读取定义的大小字节，读取成功将触发data事件，并将读取内容返回，然后开始下次读取，直到读取完成，触发end事件


#### 可写流

可写流会在内存中预定一块缓存区域，然后开始往目标文件写入，第一次会直接写入文件，此时后续要写入的内容会暂时放在缓存区， 当写入成功之后，会从缓存区依次拿取数据写入。直到清空之后再次重复刚才的步骤 以此来实现一边读取 一边写入 占用较少资源

#### 自定义可读流

为了实现可读流，引用Readable接口并用它构造新对象

- 我们可以直接把供使用的数据push出去。
- 当push一个null对象就意味着我们想发出信号——这个流没有更多数据了。

```javascript
var stream = require('stream');
var util = require('util');
util.inherits(Counter, stream.Readable);
function Counter(options) {
    stream.Readable.call(this, options);
    this._index = 0;
}
Counter.prototype._read = function() {
    if(this._index++<3){
        this.push(this._index+'');
    }else{
        this.push(null);
    }
};
var counter = new Counter();

counter.on('data', function(data){
    console.log("读到数据: " + data.toString());//no maybe
});
counter.on('end', function(data){
    console.log("读完了");
});
```

#### 可写流

为了实现可写流，我们需要使用流模块中的Writable构造函数。 我们只需给Writable构造函数传递一些选项并创建一个对象。唯一需要的选项是write函数，该函数揭露数据块要往哪里写。

- chunk通常是一个buffer，除非我们配置不同的流。
- encoding是在特定情况下需要的参数，通常我们可以忽略它。
- callback是在完成处理数据块后需要调用的函数。这是写数据成功与否的标志。若要发出故障信号，请用错误对象调用回调函数

```javascript
var stream = require('stream');
var util = require('util');
util.inherits(Writer, stream.Writable);
let stock = [];
function Writer(opt) {
    stream.Writable.call(this, opt);
}
Writer.prototype._write = function(chunk, encoding, callback) {
    setTimeout(()=>{
        stock.push(chunk.toString('utf8'));
        console.log("增加: " + chunk);
        callback();
    },500)
};
var w = new Writer();
for (var i=1; i<=5; i++){
    w.write("项目:" + i, 'utf8');
}
w.end("结束写入",function(){
    console.log(stock);
});
```

#### 管道流
有了双工流，我们可以在同一个对象上同时实现可读和可写，就好像同时继承这两个接口。 重要的是双工流的可读性和可写性操作完全独立于彼此。这仅仅是将两个特性组合成一个对象。

```javascript
const {Duplex} = require('stream');
const inoutStream = new Duplex({
    write(chunk, encoding, callback) {
        console.log(chunk.toString());
        callback();
    },
    read(size) {
        this.push((++this.index)+'');
        if (this.index > 3) {
            this.push(null);
        }
    }
});

inoutStream.index = 0;
process.stdin.pipe(inoutStream).pipe(process.stdout);
```


#### 实现转换流
- 转换流的输出是从输入中计算出来的
- 对于转换流，我们不必实现read或write的方法，我们只需要实现一个transform方法，将两者结合起来。它有write方法的意思，我们也可以用它来push数据。

```javascript
const {Transform} = require('stream');

const upperCase = new Transform({
    transform(chunk, encoding, callback) {
        this.push(chunk.toString().toUpperCase());
        callback();
    }
});

process.stdin.pipe(upperCase).pipe(process.stdout);
```