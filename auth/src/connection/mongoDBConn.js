const mongoose = require('mongoose');
const { mongoUrl } = require("../config").endpoints

module.exports = () => {
    let options = {
        useNewUrlParser: true,
        // useFindAndModify: false,
        // useCreateIndex: true,
        // poolSize: 10,
        keepAlive: 1,
        connectTimeoutMS: 30000,
        useUnifiedTopology: true
    };

    const db = mongoose.connection;
    db.on('connected', () => {
        console.log('We are connected to mongodb');
    });
    db.on('error', (err) => {
        console.log('Error connecting to mongodb ', err);
    });

    db.on('disconnect', () => {
        console.log('Oops we are disconnected from mongodb');
        // retry logic
        mongoose.connect(mongoUrl, options);
    });
    mongoose.connect(mongoUrl, options);
}