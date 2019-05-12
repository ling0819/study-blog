let url = require('url');

let {query, pathname} = url.parse('https://username:password@www.baidu.com:8000/index.html?a=1#aaa', true);
console.log(query, pathname);

