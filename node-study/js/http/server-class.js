let http = require('http');
let url = require('url');
let mime = require('mime');

class Server {
    handleRequest(req, res) {
        let pathname = url.parse()
    }

    start(port) {
        let server = http.createServer(this.handleRequest.bind(this));
        server.listen(...arg);
    }
}