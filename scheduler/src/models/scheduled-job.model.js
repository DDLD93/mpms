const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScheduledJobSchema = new Schema({
    date: { type: String, required: true },
    time: { type: String, required: true },
    callbackUrl: { type: String, required: true },
    timeUnix: { type: Number, default: 0, index: true },
    createdBy: { type: String, default: '' },
    metadata: {},

    //  0:active, 1: finished 2:cancelled
    status: { type: Number, enum: [0, 1, 2], default: 0 },

    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }
});

ScheduledJobSchema.pre('save', function (next) {
    let me = this;
    let date = new Date(this.date + ' ' + this.time);
    this.timeUnix = Math.round(date.getTime() / 1000);
    next();
});

module.exports = mongoose.model('ScheduledJob', ScheduledJobSchema);