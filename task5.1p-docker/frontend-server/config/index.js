const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const config = {
    jwtSecretKey: process.env.JWT_SECRET_KEY,
    frontendPort: process.env.FRONTEND_PORT || 3000
};

module.exports = config;
