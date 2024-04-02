const config = require('./config')
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const users = [];
const secretKey = config.jwtSecretKey;

const generateApiKey = () => {
    return crypto.randomBytes(20).toString('hex');
};

const addUser = (username) => {
    const user = {
        username,
        apiKey: generateApiKey()
    };
    users.push(user);
    return user;
};

const getUser = (username) => {
    return users.find(user => user.username === username);
};

const generateToken = (user) => {
    console.log(secretKey);
    return jwt.sign({ sub: user.username, apiKey: user.apiKey }, secretKey, { expiresIn: '1h' });
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        return null;
    }
};

module.exports = {
    addUser,
    getUser,
    generateToken,
    verifyToken
};
