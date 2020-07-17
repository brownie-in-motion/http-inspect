const fs = require('fs');

const handlers = new Map();

const dir = __dirname + '/routes';
const files = fs.readdirSync(dir);
for (const file of files) {
    const module = require(`${dir}/${file}`);
    handlers.set(module.route, module.handler);
}

module.exports = {
    path: '/api/:route',
    handler: (context) => (req, res) => {
        const route = req.params.route;
        if (!handlers.has(route)) {
            res.writeHead(404);
            res.end();
            return;
        }
        handlers.get(req.params.route)(context)(req, res);
    }
}
