const httpServer = require(__dirname + '/http-server');
const database = require(__dirname + '/database');


const db = new database(6379, '127.0.0.1', 3600);
db.connect();

const server = new httpServer(__dirname + '/routes');
server.init({
    staticPath: __dirname, 
    assetsPath: __dirname + '/assets',
    database: db
});

server.listen(3000);
