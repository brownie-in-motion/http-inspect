const HttpServer = require(__dirname + '/http-server');
const Database = require(__dirname + '/database');


const db = new Database(6379, '127.0.0.1', 3600);
db.connect();

const server = new HttpServer(__dirname + '/routes');
server.init({
    staticPath: __dirname, 
    assetsPath: __dirname + '/assets',
    database: db
});

server.listen(3000);
