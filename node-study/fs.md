## fs fileSystem 
- 文件操作
- 目录操作

 ## fs中的方法分为同步和异步


#### 同步读取 可以马上拿到返回值，缺点是阻塞主线程
  
```
 fs.readFileSync(path[, options])
```
- options
    - encoding
    - flag flag 默认 = 'r'



#### 异步读取（非阻塞）

```
 fs.readFile(path[, options], callback)
```

#### 异步写入 
```
 fs.writeFile(file, data[, options], callback)
```
- options
    - encoding
    - flag flag 默认 = 'w'
    - mode 读写权限，默认为0666

#### 同步写入

```
 fs.writeFileSync(file, data[, options])
```



> 关于二进制，八进制，十进制，十六进制之间相互转换参考链接：
https://jingyan.baidu.com/article/495ba84109665338b30ede98.html





## 创建文件 
 - mkdirSync 同步
 - mkdir 异步

 ## 删除目录
 - rmdir

 ## 删除文件
 - unlinkSync

 文件状态 fs.stat  

 深度遍历 广度遍历
