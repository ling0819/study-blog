let fs = require('fs');
let path = require('path');

// 同步版本  深入遍历
// 删除目录 rmdirSync  删除文件 unlinkSync
// fs.statSync 文件状态 isDirectory()
// fs.readdirSync 读取目录 返回的一个数组

// function removeDirSync(dir) {
//     let statObj = fs.statSync(dir);
//     // 判断是不是目录
//     if (statObj.isDirectory()) {
//         // 是目录
//         let dirs = fs.readdirSync(dir);
//         // 拼接父级路径
       
//         for(let i = 0; i< dirs.length; i++) {
//             let currentPath = path.join(dir, dirs[i]);
//             removeDirSync(currentPath);  // 删除子节点 再删除自己
//         }

//         fs.rmdirSync(dir);
        
//     } else {
//         // 是文件
//         fs.unlinkSync(dir);
//     }
// }

// removeDirSync('a');

//同步版本 广度遍历  

// function removeDirSync(dir) {
//     let arr = [dir];
//     let index = 0;
//     let currentPath;  // 读取的当前目录
//     while(currentPath = arr[index++]) {
//         let statObj = fs.statSync(currentPath);
//         if (statObj.isDirectory()) {
//             let dirs = fs.readdirSync(currentPath);
//             dirs = dirs.map(d=> path.join(currentPath, d)); // 当前子级文件夹的路径
//             arr = [...arr, ...dirs];
//         }
//     }

//     // 将文件一级一级展开放入数组 指针后移 
//     for (let i = arr.length - 1; i >= 0; i--) {
//         let statObj = fs.statSync(arr[i]);
//         if (statObj.isDirectory()) {
//             fs.rmdirSync(arr[i]);
//         } else {
//             fs.unlinkSync(arr[i]);
//         }
//     }  
// }

// removeDirSync('b');


// 异步版本  先序深度串行

// function removeDir(dir, callback) {
//     fs.stat(dir, (err, statObj) => {
//         if (statObj.isDirectory()) {
//             // 读取目录
//             fs.readdir(dir, (err, dirs) => {
//                 dirs = dirs.map(item => path.join(dir, item));
//                 // 数组中的挨着删除
//                 function next(index) {
//                     if (index === dirs.length) return fs.rmdir(dir, callback);
//                     removeDir(dirs[index], () =>next(index+1));
//                 }

//                 next(0);
//             })
//         } else {
//             fs.unlink(dir, callback);
//         }
//     })
// }

// removeDir('a');

// 异步 先序并发删除
function removeDir(dir, callback) {
    fs.stat(dir, (err, statObj) => {
        if (statObj.isDirectory()) {
            // 读取目录
            fs.readdir(dir, (err, dirs) => {
                // 并发删除
                if(dirs.length === 0){  //如果是空目录 直接删除
                    return fs.rmdir(dir, callback);
                }
                
                // 非空目录 [a/b, a/c]
                dirs = dirs.map(item =>{
                    let currentPath =  path.join(dir, item);
                    removeDir(currentPath, done);
                    return currentPath;
                });
                let index = 0;
                function done() {
                    if (++index === dirs.length) {
                        fs.rmdir(dir, callback);
                    }
                }

            })
        } else {
            fs.unlink(dir, callback);
        }
    })
}

removeDir('a');
