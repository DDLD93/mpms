const {
    APP_PORT,
    APP_MONGO_URI,
    SCHEDULER_URL,
    APP_DOMAIN
} = process.env

module.exports = {
    app: {
        port: APP_PORT || 3000,
        domain: APP_DOMAIN || "http://localhost:3000",
        mongoUrl: APP_MONGO_URI || "mongodb://localhost:27017/mpms"
    },
    schedulerURL: SCHEDULER_URL || "http://localhost:9000/api/v1/scheduler/add"
}