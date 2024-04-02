const express = require('express');
const path = require('path');
const cors = require('cors');

const frontendApp = express();
frontendApp.use(cors());

frontendApp.use(express.static(path.join(__dirname, 'public')));
frontendApp.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'index.html'));
});
frontendApp.get('/loginPage', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'auth.html'));
});

frontendApp.get('/calculatorPage', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'calculator.html'));
});

module.exports = frontendApp;
