const express = require('express');
const config = require('./config');

const app = express();
app.config = config;

require('./boot/express')(app);
require('./boot/mongodb')(app);
require('./boot/routes')(app);

console.log(`node_mongo_boilerplate listening on ${config.PORT}`);
app.listen(config.PORT);

