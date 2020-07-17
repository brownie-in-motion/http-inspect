const redis = require('redis');
const { promisify } = require('util');

class Database {
    constructor(port, host, expire) {
        this.port = port;
        this.host = host;
        this.expire = expire;
    }
    
    connect() {
        this.client = redis.createClient(this.port, this.host);
        this.methods = {
            push: promisify(this.client.rpush),
            set: promisify(this.client.hmset),
            exists: promisify(this.client.exists),
            range: promisify(this.client.lrange),
            get: promisify(this.client.hgetall),
            expire: promisify(this.client.expire)
        }
        for (const key in this.methods) {
            this.methods[key] = this.methods[key].bind(this.client);
        }
        return promisify(this.client.on).bind(this.client)('connect');
    }

    put(id, key) {
        const result = this.methods.set(`hash:${id}`, { key });
        this.methods.expire(`hash:${id}`, this.expire);
        return result;
    }

    add(id, request) {
        const result = this.methods.push(`list:${id}`, JSON.stringify(request));
        this.methods.expire(`hash:${id}`, this.expire);
        this.methods.expire(`list:${id}`, this.expire);
        return result;
    }

    has(id) {
        return this.methods.exists(`hash:${id}`);
    }

    values(id) {
        return this.methods.range(`list:${id}`, 0, -1);
    }

    get(id) {
        return this.methods.get(`hash:${id}`);
    }
}

module.exports = Database
