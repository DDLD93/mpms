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
        mongoUri: APP_MONGO_URI || "mongodb+srv://ddld93:1234567890@cluster0.fljiocn.mongodb.net"
    },
    schedulerURL: SCHEDULER_URL || "http://localhost:9000/api/v1/scheduler/add"

}