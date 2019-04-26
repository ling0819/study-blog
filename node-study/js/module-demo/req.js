let fs = require('fs');
let path = require('path');
let vm = require('vm');


function Module(id) {
    this.id = id;
    this.exports = {};
}

Module.prototype.load = function() {
    let extname = path.extname(this.id);
    let r = this.extension[extname](this);
    return this.exports = r;
}

Module.wrapper = [
    '(function(exports, module, require, __dirname, __filename)){',
    '})'
]



Module.extension = {
    '.js': (module) => {
        let str = fs.readFileSync(path.resolve(__dirname, module.id), 'utf8');
        let scriptStr = Module.wrapper[0] + str + Module.wrapper[1];
        let fn = vm.runInThisContext(scriptStr);
        fn.call(module.exports, module.exports, module, req)
    },
    '.json': (module) => {
        let r = fs.readFileSync(path.resolve(__dirname, module.id), 'utf8');
        let jsonObj = JSON.parse(r);
        return jsonObj;
     }
}






function req(id) {
    let module = new Module(id);
    let result = module.load();
    return result;
}


let r = req('./demo.json');

console.log(r);