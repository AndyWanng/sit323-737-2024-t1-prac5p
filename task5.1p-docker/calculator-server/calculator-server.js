const calculatorApp = require('./calculator-app');
const logger = require('./utils/logger');
const config = require('./config');

const port = config.calculatorPort;
calculatorApp.listen(port, () => {
    logger.info(`Calculator service listening on port ${port}`);
});
