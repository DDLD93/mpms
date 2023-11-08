/*
written by Khalil Mohammed Shams for Lexington Technologies (c) 2020
*/

'use strict';
const {
  APP_PORT,
  APP_MONGO_URI
} = process.env


module.exports = {
  app: {
    port: APP_PORT || 9000
  },
  redis: {
    host: "redisdb",
    port: 6379,
    db: 0,
  },

  mongodb: {
    uri: APP_MONGO_URI || "mongodb://localhost:27017/mpms?authSource=admin" ,
  },
};
