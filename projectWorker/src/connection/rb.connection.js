const amqp = require("amqplib");
const { rabbitmqUri ,projectOnboardingQue} = require('../config');


class RabbitMQ {
    constructor() {
        try {
            amqp.connect(rabbitmqUri).then(conn => {
                conn.createChannel().then(chan => {
                    chan.assertQueue(projectOnboardingQue, { durable: true }).then(() => {
                        console.log('Channel Ready ..');
                        chan.consume(projectOnboardingQue, (msg) => {
                            if (msg !== null) {
                                console.log('PROJECT ONBOARDING CONSUMER >>> ', msg.content.toString());
                                chan.ack(msg)
                            }
                        });
                    });
                })
            }).catch((err) => {
                console.log('Error connecting to RabbitMQ: ', err);
            });

        } catch (err) {
            console.log('There is an Error: ', err);
        }
    }
}
module.exports = new RabbitMQ()