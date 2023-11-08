/*
written by Khalil Mohammed Shams for Lexington Technologies (c) 2020
*/
'use strict';

// const express = require('express');
const ScheduledJobController = require('../controllers/scheduled-job.controller');

module.exports = (express) => {
    let api = express.Router();

    api.get('/', async (req, res) => {
        try {
            let result = await ScheduledJobController.getAll();
            res.status(200).json({ ok: true, data: result });
        } catch (err) {
            res.status(500).json({ ok: false, error: err });
        }
    });

    api.get('/:id', async (req, res) => {
        let { id } = req.params;
        try {
            let result = await ScheduledJobController.getOne({ _id: id });
            res.status(200).json({ ok: true, data: result });
        } catch (err) {
            res.status(500).json({ ok: false, error: err });
        }
    });

    return api;
};