require("dotenv").config()
require('./connection/mongoDBConn')();
const { createProxyMiddleware } = require('http-proxy-middleware');
const cfg = require("./config")
const verifyToken = require("./middleware/token.middleware")
const express = require("express");
const cors = require('cors');
const app = express()
let { services } = cfg



app.use(express.urlencoded({ extended: true }));
app.use(express.json())

//public 
app.use('/api/v1/auth', createProxyMiddleware({ target: `${services.MICROSERVICE_AUTH}`, changeOrigin: true }))

// private 
app.use(verifyToken)
app.use('/api/v1/nin', createProxyMiddleware({ target: `${services.MICROSERVICE_AUTH}`, changeOrigin: true }))
app.use('/api/v1/project', createProxyMiddleware({ target: `${services.MICROSERVICE_PROJECT}`, changeOrigin: true }))
app.use('/api/v1/user', createProxyMiddleware({ target: `${services.MICROSERVICE_AUTH}`, changeOrigin: true }))


app.use(cors());


app.listen(cfg.app.port, () => {
    console.log(`app listening on port: ${cfg.app.port}`)
})

