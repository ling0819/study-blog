class EventEmitter {
    constructor() {
        // this._events = {};
    }


    on (eventName, callBack){
        // 因为只是继承了构造函数的原型方法 所以得给子类添加this._events
        if(eventName !== 'newListener') {
            if (this._events['newListener']) {
                this._events['newListener'].forEach(fn => fn(eventName))
            }
        }


        if (!this._events) {
            this._events = {};
        }
        // 初始化事件队列 
        if (this._events[eventName]) {
            this._events[eventName].push(callBack);
        } else {
            this._events[eventName] = [callBack];
        }
    }

    off(eventName, callBack){
        if (this._events[eventName]) {
            // 注意filter清除后要赋值
            this._events[eventName] = this._events[eventName].filter(fn => {
                return fn != callBack && fn.l !== callBack
               
            }) 
        }
    }

    emit(eventName, ...args){
        // 判断事件是否存在，存在则触发回调队列
        if (this._events[eventName]) {
            this._events[eventName].forEach(fn => {
                fn.call(this, ...args);
            })
        }
    }

    once(eventName, callBack) {
        function one() {
            callBack(...arguments);
            this.off(eventName, one);
        }

        one.l = callBack;

        this.on(eventName, one);
    }
}


module.exports = EventEmitter;
