//let EventEmitter = require('events');
let EventEmitter = require('./event.js');
let util = require('util');
//  EventEmitter
// on绑定事件， emit发射事件

// 获取到父类的方法
// __proto__
// Object.create
// Object.setPrototypeof

function Girl() {}
// 继承原型上的方法
util.inherits(Girl, EventEmitter);
let girl = new Girl();
let cry = function(str){
    console.log(str + '哭啦')
}

let say = function() {
    console.log('hello');
}

girl.on('newListener', (type) => {
    console.log(type); // 每次调用on方法就会执行 先触发这个方法 再执行绑定
})

girl.on('cry', cry);
girl.on('cry', cry);

girl.once('say', say);
girl.off('say', say); // 取消订阅
// girl.emit('say');
// girl.emit('say');
// girl.emit('cry', '胖子');
// // girl.off('cry', cry); // 取消订阅
// girl.emit('cry', '瘦子');


// on off emit newListener 每次绑定不同事件都会触发 onece只能触发一次
