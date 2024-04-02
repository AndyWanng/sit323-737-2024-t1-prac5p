const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const config = {
    jwtSecretKey: process.env.JWT_SECRET_KEY,
    calculatorPort: process.env.CALCULATOR_PORT || 3002

};

module.exports = config;
