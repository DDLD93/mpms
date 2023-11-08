/*
written by Khalil Mohammed Shams for Lexington Technologies (c) 2020
*/
'use strict';

require("./connections/mongoCon")();
const { port } = require('./configs').app;
const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/api/v1/scheduler', require('./routes/scheduler.route')(express));
app.use('/api/v1/job', require('./routes/scheduled-job.route')(express));



const schdulerController = require('./controllers/scheduler.controller');
const serverId = require('uuid').v4().substr(24).replace(/-/g, '');

app.post('/catchall', (req, res) => {
    console.log(req.body);
    res.status(201);
})

app.listen(port, () => {
    console.log('Server up and running on port:' + port);
})





