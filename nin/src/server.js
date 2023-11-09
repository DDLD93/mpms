const UPLOADS = __dirname + '/uploads';
require('./connection/mongo.connection')();
const express = require("express");
const cors = require('cors');
require('dotenv').config();
const { port } = require("./config").app

const app = express()


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

// connecting to database 

app.use("/api/v1/nin", require("./routes/project.route")(UPLOADS));



app.listen(port, () => {
    console.log(`app listening on port: ${port}`)
})

