## Node事件循环

#### js是单线程的

栈和队列
- 栈 先进后出
- 队列  先进先出

宏任务 > 微任务

微任务先执行

加载js文件 =>  
执行主栈程序之后 => 清空微任务队列 => 从宏任务队列里拿出一个任务在主栈中执行 => 主栈执行完毕后如果有微任务再次清空微任务队列 => 从宏任务队列里拿出一个任务在主栈中执行 .... 
循环至任务执行完毕

浏览器的事件循环和node事件循环统一 (node 11) 宏任务微任务执行顺序

- timer 阶段
- poll 阶段  回到timer阶段执行回调并且执行IO回调 如果check阶段有任务，进入check fs.readFile
- check 阶段  setImmdiate



宏任务和微任务的分类

 - 宏任务： script setTimeout setImmdiate(ie)  MessageChannel I/O UI rendering
 - 微任务：promise.then MutationObserver  process.nextTick
 > 微任务会比宏任务快, js中会先执行script脚本


js渲染和ui渲染线程互斥


## 进程和线程的关系

- 进程是计算机分配任务和调度任务的基本单位

- js一个进程里只有一个主线程

- 主线程中不能同时进行ui渲染和运行js

如何提高浏览器js加载速度 ？

- defer / async 加载js脚本

    async不会按顺序加载

    defer按照顺序加载外部脚本

- prefetch(会先加载资源)  
  preload(会把路由拆分) 默认不会马上加载 等待浏览器空闲时候加载


## node 一些常用场景
- 中间层 
  解决跨域问题

- 创建高性能并发服务器 （web端 读取文件 i/o密集型 不适合cpu密集型 加密 解密 运算）

- nginx 开多进程 => node => java 


## i/o 异步/同步  阻塞/非租塞

- 内核v8 基于libuv库 多线程(可以实现异步)
- 拥有服务端能力，内置了很多模块 fs http...

## 异步/同步
- 指的是被调用方 fs 等等
- 阻塞和非租塞  被调用方

#### 浏览器里面window node里是global

![avatar](http://image.mamicode.com/info/201803/20180307105410582911.jpg)


## 进程和线程的区别
一个进程可以有多个线程， 比如渲染线程， js引擎线程， http请求等。
进程表示一个程序， 线程是进程中的单位。

多线程在单核cpu中也是顺序执行的

多个cpu就可以在多个cpu中同时执行

单线程的优点： 解决切换上下文的时间，锁的问题，节省内存

> node 主进程， 开多个子进程， 每个进程包含一个进程