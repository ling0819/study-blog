// node 中间层  在node中发送请求 无跨域

let http = require('http');

let client = http.request({
    host: 'localhost',
    method: 'POST',
    port: 9001,
    headers: {
        a: 1,
        // 'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Type': 'application/json'
    }
}, (res) => {
    let arr = [];
    res.on('data', (data) => {
        arr.push(data);
    })

    res.on('end', () => {
        console.log(Buffer.concat(arr).toString());
    })
})

// client.end('name=1111');
client.end(JSON.stringify({name: 2222}));