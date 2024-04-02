const authService = require('./authService');
const logger = require('./utils/logger');

const authenticate = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
        logger.error('Authentication failed: Token not provided.');
        return res.status(401).json({ message: 'No token provided.' });
    }
    const decoded = authService.verifyToken(token);
    if (!decoded) {
        logger.error('Authentication failed: Token is invalid or expired.');
        return res.status(401).json({ message: 'Token is invalid or expired.' });
    }
    req.user = decoded;
    next();
};

module.exports = authenticate;
