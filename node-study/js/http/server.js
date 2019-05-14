let http = require('http');

let server = http.createServer();
let querystring = require('querystring');

// 内部通过tcp进行传输的  socket 套接字  socket是一个双工流
// 可以拿到浏览器发来的所有内容 buffer 行 头 体
// 在内部把socket分成两部分 this.emit('request', req, res)
server.on('request', (req, res) => {
    console.log('请求来了');
    // 请求行的数据
    console.log(req.method);
    console.log(req.url); // 当前请求的路径
    console.log(req.httpVersion);
    // -----
    // 请求头
    console.log(req.headers); // 头的字段都是小写的
    // 请求体
    let arr = [];
    req.on('data', (chunk) => {
        arr.push(chunk);
    });
    req.on('end', () => {
        let str = Buffer.concat(arr).toString();
        let obj = {};
        if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
            obj = querystring.parse(str);
        }

        if (req.headers['content-type'] === 'application/json') {
            obj = JSON.parse(str);
        }
        
        res.statusCode = 200;
        res.setHeader('a', 1);
        res.end(`${obj.name}`);
    })
});

server.listen(9001, () => {
    console.log('server start')
});


// nodemon node monitor 监控node 变化 在代码里监控那个目录 可全局安装nodemon xxx.js
