/*
written by Khalil Mohammed Shams for Lexington Technologies (c) 2020
*/
'use strict';
const _ = require('lodash');

const ScheduledJobModel = require('../models/scheduled-job.model');

class ScheduledJobController {
    constructor() { }

    getOne(conditionsObj) {
        return new Promise((resolve, reject) => {
            ScheduledJobModel.findOne(conditionsObj, (err, scheduledJob) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(scheduledJob);
                }
            });
        });
    }

    getAll(conditionsObj = {}, fieldsObj = null, optionsObj = {}) {
        return new Promise((resolve, reject) => {
            ScheduledJobModel.find(conditionsObj, fieldsObj, optionsObj, (err, scheduledJobs) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(scheduledJobs);
                }
            });
        });
    }

    create(scheduledJobObj) {
        return new Promise((resolve, reject) => {
            let obj = new ScheduledJobModel(scheduledJobObj);
            obj.save((err, scheduledJob) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(scheduledJob);
                }
            });
        });
    }

    edit(id, newScheduledJobObj) {
        return new Promise(async (resolve, reject) => {
            try {
                let oldScheduledJobObj = await this.getOne({ _id: id });
                if (oldScheduledJobObj) {
                    _.merge(oldScheduledJobObj, newScheduledJobObj);
                    let date = new Date();
                    oldScheduledJobObj.updated = date.toISOString();
                    oldScheduledJobObj.save((err) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve('Scheduled Job Updated Successfully!');
                        }
                    });
                } else {
                    reject('Scheduled Job Not found !');
                }
            } catch (err) {
                reject(err);
            }
        });
    }

    updateStatus(id, status) {
        return new Promise(async (resolve, reject) => {
            try {
                ScheduledJobModel.findOneAndUpdate({ _id: id }, { $set: { status } }, { new: true }, (err, updatedScheduledJob) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(updatedScheduledJob);
                    }
                });
            } catch (err) {
                reject(err);
            }
        });
    }

    del(id) {
        return new Promise((resolve, reject) => {
            ScheduledJobModel.findOneAndDelete({ _id: id }, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve("Scheduled Job deleted successfully!");
                }
            });
        });
    }
}

module.exports = new ScheduledJobController();