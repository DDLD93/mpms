/*
written by Khalil Mohammed Shams for Lexington Technologies (c) 2020
*/
'use strict';
const { Job } = require('node-schedule');
const crypto = require('crypto');
const rp = require('request-promise');

const ScheduledJobController = require('./scheduled-job.controller');

class SchedulerController {
    _storage = [];

    constructor() {
        (async () => {
            console.log('Fetching Persisted Schedules ...');
            try {
                let promiseArr = [];
                let jobs = await this.reQueuePersisted();
                jobs.map((j) => console.log(j));
            } catch (err) {
                console.log(err);
            }
        })();
    }

    async addSchedule(schedulerObj) {
        try {
            let date = new Date(schedulerObj.date + ' ' + schedulerObj.time);
            console.log("data >>", date);
            if (isDateInFuture(date)) {
                let persistedObj = await ScheduledJobController.create(schedulerObj);
                let id = (persistedObj._id).toString();
                let schObj = new Job(id, async () => {
                    let d = new Date();
                    console.log(`Job id : ${id} has finished @ ${d.toString()}`);
                    let cbb = await httpCallback(persistedObj);
                    console.log('Calback Response');
                    deleteJobFromActives(this._storage, id);
                    ScheduledJobController.updateStatus(id, 1);
                });
                schObj.timeUnix = schedulerObj.timeUnix;
                schObj.callbackUrl = schedulerObj.callbackUrl;
                schObj.metadata = schedulerObj.metadata;
                schObj.schedule(date);

                this._storage.push(schObj);
                return { ok: true, data: persistedObj };
            } else {
                return { ok: false, error: { message: 'Schedule Date is invalid. Job not scheduled!' } };
            }
        } catch (err) {
            console.log('Error creating Schedule ', err);
        }
    }

    getSchedules() {
        let ret = [];
        if (this._storage.length > 0) {
            this._storage.forEach((obj) => {
                let nextDate = obj.nextInvocation();
                let theObj = {
                    id: obj.name,
                    timeUnix: obj.timeUnix,
                    callbackUrl: obj.callbackUrl,
                    dueDate: nextDate || '',
                    metadata: obj.metadata
                };
                ret.push(theObj);
            });
        }
        return ret;
    }

    async cancelActive(id) {
        let returnedMsg = `Job with id: ${id} NOT FOUND`;
        let scheduleToCancel = null;
        let idx;
        for (let i = 0; i < this._storage.length; i++) {
            scheduleToCancel = this._storage[i];
            if (scheduleToCancel.name === id) {
                break;
            }
        }
        let isCancelled = scheduleToCancel.cancel();
        if (isCancelled) {
            await ScheduledJobController.updateStatus(id, 2);
            deleteJobFromActives(this._storage, id);
            returnedMsg = `Job with id: ${id} has been cancelled successfully!`;
        }
        return returnedMsg;
    }

    async reSchedule(schedulerObj) {
        return new Promise(async (resolve, reject) => {
            try {
                let id = (schedulerObj._id).toString();
                let date = new Date(schedulerObj.date + ' ' + schedulerObj.time);
                if (isDateInFuture(date)) {
                    let schObj = new Job(id, async () => {
                        let d = new Date();
                        console.log(`Job id : ${id} has finished @ ${d.toString()}`);
                        let cbb = await httpCallback(schedulerObj);
                        deleteJobFromActives(this._storage, id);
                        ScheduledJobController.updateStatus(id, 0);
                    });
                    schObj.metadata = schedulerObj.metadata;
                    schObj.schedule(date);
                    this._storage.push(schObj);
                    resolve(`Job ${id} rescheduled for ${date.toString()}`);
                } else {
                    await ScheduledJobController.updateStatus(id, 1);
                    console.log(`Aggressive firing of expired job`)
                    let cbb = await httpCallback(schedulerObj);
                    reject(`Job ${id} for ${date.toString()} Skipped Reschedulling. Marking Job as Expired`);
                }
            } catch (err) {
                console.log(`Error ReScheduling ${schedulerObj._id} , ${err}`);
            }
        });
    }

    async reQueuePersisted() {
        try {
            let promiseArr = [];
            let jobs = await ScheduledJobController.getAll({ status: 0 });
            jobs.map((scheduledObj) => {
                promiseArr.push(this.reSchedule(scheduledObj));
            });
            return Promise.all(promiseArr);
        } catch (err) {
            return Promise.reject(err);
        }
    }
}


function deleteJobFromActives(arrInstance, id) {
    for (let i = 0; i < arrInstance.length; i++) {
        if (arrInstance[i].name === id) {
            arrInstance.splice(i, 1);
        }
    }
}

function getScheduleInfo() {
    let ret = [];
    if (this._storage.length > 0) {
        for (let i = 0; i < this._storage.length; i++) {
            let j = this._storage[i];
            let dat = j.nextInvocation();
            ret.push({ id: j.name, dueDate: dat.toString() })
        }
    }
    return ret;
}

function httpCallback(payload) {
    console.log("calling back client .... >> ");
    return new Promise(async (resolve, reject) => {
        //const signature = crypto.createHmac("sha512", config.hmackey).update(JSON.stringify(payload.metadata)).digest("hex");
        try {
            const options = {
                method: 'POST',
                uri: payload.callbackUrl,
                body: payload.metadata,
                json: true
            };
            let res = await rp(options);
            resolve(res);
        } catch (err) {
            reject(err);
        }
    });
}

function isDateInFuture(date) {
    let ret = false;
    let sdate = parseInt(Math.round(date.getTime() / 1000));
    let now = parseInt(Math.round(Date.now() / 1000));
    if (sdate > now) ret = true;
    return ret;
}


module.exports = new SchedulerController();