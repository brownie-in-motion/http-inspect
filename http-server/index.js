const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const { promisify } = require('util');

class httpServer {
    routes = [];
    constructor (dir) {
        this.app = express();
        const files = fs.readdirSync(dir);
        for (const file of files) {
            const module = require(`${dir}/${file}`);
            module.path = path.normalize(module.path);
            module.depth = module.path.split('/').length - 1;
            this.routes.push(module);
        }
        this.routes.sort((a, b) => (b.depth - a.depths));
    }

    init (context) {
        this.app.use(bodyParser.json());
        for (const route of this.routes) {
            if (route.method !== 'GET') {
                this.app.post(route.path, route.handler(context)); 
            }
            if (route.method !== 'POST') {
                this.app.get(route.path, route.handler(context)); 
            }
        }
    }

    listen = (port) => promisify(this.app.listen).bind(this.app)(port);
}

module.exports = httpServer;
