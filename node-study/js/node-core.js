// node 是js的执行环境
// 执行node的方式 node + 文件名 命令



// node为了实现模块化 执行文件时候增加了匿名函数  
// 浏览器中可以访问window 不能访问global
// 服务端可以访问global上的属性


// console.log(Object.keys(global));

// process 进程 当前执行环境
// Buffer 可以读写文件 放入内存  Buffer


// global的属性可以直接被访问
// argv 运行时传递的参数
// console.log(process.argv);
// env 环境变量 当前运行的命令行工具中设置一个变量  windows下 set NODE_ENV=development
// mac export NODE_ENV=devlopment 可以根根据不同的环境变量调用不同的接口
// cross-env npm包设置不同系统下环境变量
// console.log(process.env.NODE_ENV);
// cwd当前的工作目录 node运行的地方
// console.log(process.cwd())
// nextTick
// stdin stderr stdout



// 先执行主栈 => setTimeout队列 => poll队列 => check队列
// 取决于主栈执行时间  如果执行够快 setTimeout还未到时间，则继续往下走


setImmediate(() => {
    console.log(1)
})

setTimeout(() => {
    console.log(2);
})

// 宏任务和微任务执行机制和浏览器一样 不过node每个阶段都有自己的队列
// 有check会先走check 没有会等待poll


