const amqp = require("amqplib");
const { rabbitmqUri, projectOnboardingQue } = require('../config').endpoint;

class RabbitMQ {
    constructor() {
        try {
            amqp.connect(rabbitmqUri).then(conn => {
                conn.createChannel().then(chan => {
                    this.channel = chan
                    this.channel.assertQueue(projectOnboardingQue, { durable: true }).then(() => {
                        console.log('Queue Ready ..');
                    });
                })
            }).catch((err) => {
                console.log('Error connecting to RabbitMQ: ', err);
            });

        } catch (err) {
            console.log('There is an Error: ', err);
        }
    }

    async queueJob(data) {
        try {
            this.channel.sendToQueue(projectOnboardingQue, Buffer.from(JSON.stringify(data)), { persistent: true })
        } catch (err) {
            console.error(err)
        }
    }
}
module.exports = new RabbitMQ()