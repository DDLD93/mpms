const redis = require('redis');
const { host, password, port } = require('../config').redis;

const client = redis.createClient({
    url: `redis://default:${password}@${host}:${port}`
});

client.on('connect', () => {
    console.log(' client Connecting to Redis ...')
})
    .on('ready', async () => {
        console.log('client Connected to Redis!')
    })
    .on('reconnecting', () => {
        console.log('client Reconnected to Redis!')
    })
    .on('end', () => {
        console.log('client disonnected from Redis!')
    })
    .on('error', err => {
        console.log('client Redis error ... >> ', err)
    });


module.exports = { client }