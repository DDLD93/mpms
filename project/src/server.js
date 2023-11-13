const UPLOADS = __dirname + '/uploads';
require('./connection/mongo.connection')();
const express = require("express");
const cors = require('cors');
const { port } = require("./config").app

const app = express()


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

// connecting to database 

app.use("/api/v1/project", require("./routes/project.route")(UPLOADS));
app.use("/api/v1/milestone", require("./routes/milestone.route")(UPLOADS));



app.listen(port, () => {
    console.log(`app listening on port: ${port}`)
})

