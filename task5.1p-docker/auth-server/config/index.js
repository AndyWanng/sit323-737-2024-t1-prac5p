const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const config = {
    jwtSecretKey: process.env.JWT_SECRET_KEY,
    authPort: process.env.AUTH_PORT || 3001
};

module.exports = config;
