const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./utils/logger');
const authApi = require('./authApi');
const cors = require('cors');

const authApp = express();
authApp.use(cors());
authApp.use(bodyParser.json());
authApp.use(bodyParser.urlencoded({ extended: true }));
authApp.use('/api/auth', authApi);

authApp.use((error, req, res, next) => {
    logger.error(error.message);
    res.status(500).send('Auth service error occurred.');
});

module.exports = authApp;
