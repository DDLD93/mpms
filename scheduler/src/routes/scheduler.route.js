/*
written by Khalil Mohammed Shams for Lexington Technologies (c) 2020
*/
'use strict';

// const express = require('express');
const schdulerController = require('../controllers/scheduler.controller');

module.exports = (express) => {
    let api = express.Router();

    api.post('/add', async (req, res) => {
        let scheduleObj = req.body;
        let result = await schdulerController.addSchedule(scheduleObj);
        console.log({ result })
        if (result.ok) {
            res.status(200).json(result.data);
        } else {
            res.status(500).json(result.error);
        }
    });

    api.get('/active', (req, res) => {
        res.status(200).json(schdulerController.getSchedules());
    });

    api.put('/cancel/:id', async (req, res) => {
        const id = req.params.id;
        res.status(200).json(await schdulerController.cancelActive(id));
    });


    return api;
};