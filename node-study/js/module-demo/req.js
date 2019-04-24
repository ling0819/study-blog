let fs = require('fs');
let path = require('path');

function Module(id) {
    this.id = id;
    this.exports = {};
}

Module.prototype.load = function() {
    let extname = path.extname(this.id);
    let r = this.extension[extname](this);
    return this.exports = r;
}



Module.prototype.extension = {
    '.js': () => {},
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