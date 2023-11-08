/*
written by Khalil Mohammed Shams for Lexington Technologies (c) 2020
*/
'use strict';

const mongoose = require('mongoose');
const { uri } = require('../configs').mongodb;

mongoose.Promise = Promise;
let db = mongoose.connection;

module.exports = () => {
    let options = {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        poolSize: 10,
        keepAlive: 1,
        connectTimeoutMS: 30000,
        useUnifiedTopology: true
    };

    mongoose.connect(uri, options);

    db.on('connecting', () => {
        console.log('[MONGODB:EVENT:CONNECTING] connecting.....');
    });

    db.on('error', (error) => {
        console.error('[MONGODB:EVENT:ERROR] Error ' + error);
        mongoose.disconnect();
    });
    db.on('connected', () => {
        console.log('[MONGODB:EVENT:CONNECTED] connected!');
    });
    db.once('open', () => {
        console.log('[MONGODB:EVENT:OPEN] connection open');
    });
    db.on('reconnected', () => {
        console.log('[MONGODB:EVENT:RECONNECTED] reconnected');
    });
    db.on('disconnected', () => {
        console.log('[MONGODB:EVENT:DISCONNECTED] disconnected');
        mongoose.connect(uri, options);
    });
};