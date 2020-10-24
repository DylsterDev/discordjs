const MyClient = require('./Structures/Client');
const config = require('../config.json');

const client = new MyClient(config);
client.start();
