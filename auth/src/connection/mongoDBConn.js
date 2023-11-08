const mongoose = require('mongoose');
// const { host, port, username, password, database } = require('../configs').mongoDb;
// const url = process.env.DATABASE_URL || "mongodb+srv://AuthService:16001105@cluster0.kbf3k.mongodb.net/Buildings?retryWrites=true&w=majority"
const url = "mongodb://localhost:27017/user"
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
        mongoose.connect(url,options);
    });
    mongoose.connect(url,options);
}