const express = require('express');
const router = express.Router();
const logger = require('./utils/logger');
const calculatorService = require('./calculatorService');

router.post('/:operation', (req, res, next) => {
    const operation = req.params.operation;
    const { num1, num2 } = req.body;

    if (!num1 || (!num2 && operation !== 'sqrt')) {
        if (isNaN(num1) || isNaN(num2)) {
        logger.error(`Invalid input: num1=${num1}, num2=${num2}`);
        return res.status(400).send('Invalid input: num1 and num2 must be valid numbers');
        }
    }

    try {
        const result = calculatorService.calculate(operation, parseFloat(num1), parseFloat(num2));
        logger.info(`Operation ${operation} successful: ${num1}, ${num2} = ${result}`);
        res.send({ result });
    } catch (error) {
        logger.error(`Operation ${operation} failed: ${error.message}`);
        next(error);
    }
});

module.exports = router;
