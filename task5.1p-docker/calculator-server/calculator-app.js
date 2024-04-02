const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./utils/logger');
const calculatorApi = require('./calculatorApi');
const authenticate = require('./authMiddleware');
const cors = require('cors');

const calculatorApp = express();
calculatorApp.use(cors());
calculatorApp.use(bodyParser.json());
calculatorApp.use(bodyParser.urlencoded({ extended: true }));
calculatorApp.use('/api/calculate', authenticate, calculatorApi);

calculatorApp.use((error, req, res, next) => {
    logger.error(error.message);
    res.status(500).send('Calculator service error occurred.');
});

module.exports = calculatorApp;
