const {
    APP_PORT,
    APP_MONGODB_URL,
    APP_VERSION,
    JWT_SECRET,

} = process.env;

module.exports = {


    app: {
        port: APP_PORT || 3000,
        jwtSecret: JWT_SECRET || "898675643qwertyui9807654ertyui9087654ertyu897654r6ty89765t7654w35w34we"
    },
    endpoints: {
        mongoUrl: APP_MONGODB_URL || "mongodb://localhost:27017/mpms"
    },



}

