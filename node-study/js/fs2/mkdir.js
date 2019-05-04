let fs = require('fs');
// 同步创建
// function mkdirSync(paths) {
//     let arr = paths.split('/');
//     for (let i = 0; i < arr.length; i++) {
//         let currentPath = arr.slice(0, i+1).join('/');
//         // 如果目录已存在，不再创建
//         try {
//             fs.accessSync(currentPath);
//         } catch(e) {
//             fs.mkdir(currentPath);
//         }
        
//     }
// }


// 异步创建
function mkdir(paths, cb) {
    let arr = paths.split('/');
    function next(index) {
        if (index >= arr.length) return cb();
        let currentPath = arr.slice(0, index+1).join('/');
        fs.access(currentPath, (err) => {
            if (err) {
                fs.mkdir(currentPath, () => next(index+1))
            } else {
                next(index+1);
            }
        })
    }
    next(0);
}


// 同步创建目录  默认创建目录必须父级存在才能创建子级
// fs.mkdirSync('./a/b/c');
mkdirSync('a/b/c');
mkdir('b/c/d', () => console.log('创建完成'))

