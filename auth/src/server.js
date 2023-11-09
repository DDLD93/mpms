require("dotenv").config()
require('./connection/mongoDBConn')();
const express = require("express");
const cors = require('cors');
const {port} = require("./config").app
const app = express()



app.use(cors());
app.use(express.urlencoded({ extended: true }));
//intitializing body parser
app.use(express.json())

// connecting to database 

app.use("/api/v1/auth", require("./routes/user.route")(express));


app.listen(port,()=>{
    console.log(`app listening on port: ${port}`)
})

