const serveStatic = require('serve-static');

module.exports = {
    path: '/static/*',
    handler: ({ staticPath }) => (req, res) => {
        serveStatic(staticPath, {
            fallthrough: false
        })(req, res, (error) => {
            res.writeHead(404);
            res.end();
        });
    }
}

