const axios = require('axios');
const logger = require('./utils/logger');
const authServiceUrl = 'http://auth-server:3001/api/auth/verifyToken';

const authenticate = async (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
        logger.error('Authentication failed: Token not provided.');
        return res.status(401).json({ message: 'No token provided.' });
    }
    try {
        const response = await axios.post(authServiceUrl, { token });
        req.user = response.data.user;
        next();
    } catch (error) {
        logger.error(`Authentication failed: ${error.response?.data?.message || error.message}`);
        return res.status(error.response?.status || 500).json({
            message: error.response?.data?.message || 'An error occurred during authentication.'
        });
    }
};

module.exports = authenticate;
