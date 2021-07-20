const express = require('express');
const app = express();
const expressConfig = require('./config/expressConfig');
const databaseConfig = require('./config/database');
const {port} = require('./config/confing');

start();
async function start() {

    expressConfig(app);
    await databaseConfig(app);

    app.listen(port, () => console.log(`Server is listening on port ${port}...`));
}