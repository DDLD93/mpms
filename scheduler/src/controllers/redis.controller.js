const { client } = require("../connections/redis.connection");

class RedisCTRL {
    constructor() {
        this.#init()
    }
    async #init() {
        await client.connect()
    }

    write(key, value, option={}) {
        client.set(key, value, option)
    }

    async read(key) {
        let value = await client.get(key)
        return value
    }


}
module.exports = new RedisCTRL();