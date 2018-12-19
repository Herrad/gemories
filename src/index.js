const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const createList = require('./list');

var server = function () {
    const app = express();
    const router = express.Router();
    let httpServer;

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use('/list', createList(router))

    return {
        start: function (options) {
            httpServer = http.createServer(app);
            httpServer.listen(options.port)

            console.log('Listening on', options.port);
        },
        stop: function (callback) {
            httpServer.stop(callback);
        }
    };
};

if (require.main === module) {
    new server().start({
        port: 1234
    });
}

module.exports = server;
