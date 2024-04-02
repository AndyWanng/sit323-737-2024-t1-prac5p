const authApp = require('./auth-app');
const logger = require('./utils/logger');
const config = require('./config');

const port = config.authPort;
authApp.listen(port, () => {
    logger.info(`Auth service listening on port ${port}`);
});
