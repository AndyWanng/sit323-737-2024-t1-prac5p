const express = require('express');
const router = express.Router();
const authService = require('./authService');
const logger = require('./utils/logger');

router.post('/register', (req, res) => {
    const { username } = req.body;
    if (!username) {
        logger.error('Registration failed: username is required.');
        return res.status(400).json({ message: 'Username is required.' });
    }
    const user = authService.addUser(username);
    logger.info(`User registered: ${username}`);
    res.status(201).json(user);
});

router.post('/login', (req, res) => {
    const { username, apiKey } = req.body;
    const user = authService.getUser(username);
    if (!user || user.apiKey !== apiKey) {
        logger.error('Login failed: Invalid username or apiKey.');
        return res.status(401).json({ message: 'Invalid username or apiKey.' });
    }
    const token = authService.generateToken(user);
    logger.info(`User logged in: ${username}`);
    res.json({ token });
});

router.post('/verifyToken', (req, res) => {
    const { token } = req.body;
    try {
        const user = authService.verifyToken(token);
        res.json({ user });
    } catch (error) {
        res.status(401).json({ message: 'Token is invalid or expired.' });
    }
});

module.exports = router;
