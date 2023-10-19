const amqp = require('amqp-connection-manager');

const connection = amqp.connect('amqp://localhost');
const channelWrapper = connection.createChannel({ json: true });

const queue = 'TwoQueue';
console.log(`>> Listening ${queue}...`);

channelWrapper.consume(queue, (message) => {
    const messageContent = JSON.parse(message.content.toString('utf8'));
    const moment = new Date().toLocaleString();

    console.log(`[${moment}] ${messageContent.data}`);
}, { noAck: true, consumerTag: 'two-consumer' });
