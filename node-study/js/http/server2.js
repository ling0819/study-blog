let http = require('http');
let url = require('url');
let path = require('path');
let fs = require('fs');
let mime = require('mime')

http.createServer((req, res) => {
    // 获取请求的路径 去当前目录下查找
    let {pathname} = url.parse(req.url, true);
    let curPath = path.join(__dirname, pathname);
    // 获取当前文件的描述符
    fs.stat(curPath, (err, statObj) => {
        if (err) {
            res.statusCode = 404;
            return res.end('Not Found');
        }
        // 判断是不是目录
        if (statObj.isDirectory()) {
            curPath = path.join(curPath, 'index.html');
            console.log(curPath);
            // 判断能否读取到目录下的文件
            fs.access(curPath, (err) => {
                if (err) {
                    res.statusCode = 404;
                    return res.end('Not Found');
                } else {
                    res.setHeader('Content-Type', mime.getType(curPath) + ';charset=utf8');
                    fs.createReadStream(curPath).pipe(res);
                }
            })
        } else {
            res.setHeader('Content-Type', mime.getType(curPath) + ';charset=utf8');
            fs.createReadStream(curPath).pipe(res);
        }
    })
    
}).listen(9002);


