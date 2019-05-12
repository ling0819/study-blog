## http协议

常见状态码

- 200(OK 客户端发过来的数据被正常处理
- 204(Not Content 正常响应，没有实体
- 206(Partial Content 范围请求，返回部分数据，响应报文中由Content-Range指定实体内容   断点续传


- 301(Moved Permanently) 永久重定向
- 302(Found) 临时重定向，规范要求方法名不变，但是都会改变
- 303(See Other) 和302类似，但必须用GET方法
- 304(Not Modified) 状态未改变 配合(If-Match、If-Modified-Since、If-None_Match、If-Range、If-Unmodified-Since)  缓存 服务器设置
- 307(Temporary Redirect) 临时重定向，不该改变请求方法



- 400(Bad Request) 请求报文语法错误
- 401 (unauthorized) 需要认证  没登录
- 403(Forbidden) 服务器拒绝访问对应的资源  登录了无法访问
- 404(Not Found) 服务器上无法找到资源


- 500(Internal Server Error)服务器故障
- 503(Service Unavailable) 服务器处于超负载或正在停机维护

## 请求方法  restFul api

- /user GET 获取
- /user POST  增加 增加请求头 就不是简单请求了
- /user DELETE 删除
- /user PUT 修改
- /options OPTIONS 跨域 试探请求 预检


## 跨域  
域名 端口号 协议
- 解决跨域 (后端解决跨域 请求头)

简单请求与复杂请求
https://www.cnblogs.com/renpingsheng/p/7688134.html

简单请求就是使用设定的请求方式请求数据
而非简单请求则是在使用设定的请求方式请求数据之前,先发送一个OPTIONS请求,看服务端是否允许客户端发送非简单请求.
    只有"预检"通过后才会再发送一次请求用于数据传输

-postman 可以调试接口


## url地址
服务端无法拿取hash

https://username:password@www.baidu.com:8000/index.html?a=1#aaa




