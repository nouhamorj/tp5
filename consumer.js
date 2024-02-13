const { Kafka } = require('kafkajs');
const mongoose = require('mongoose');
const Message = require('./models/message'); // Assurez-vous d'importer votre modèle Message

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092']
});
const consumer = kafka.consumer({ groupId: 'test-group' });

const run = async () => {
    await mongoose.connect('mongodb://localhost:27017/bd_kafka', { useNewUrlParser: true, useUnifiedTopology: true });

    await consumer.connect();
    await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                value: message.value.toString(),
            });
            const newMessage = new Message({
                value: message.value.toString(),
            });
            await newMessage.save();
        },
    });
};

run().catch(console.error);