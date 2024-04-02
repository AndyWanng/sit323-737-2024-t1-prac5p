const frontendApp = require('./frontend-app');
const logger = require('./utils/logger');
const config = require('./config');

const port = config.frontendPort;
frontendApp.listen(port, () => {
    logger.info(`Frontend service listening on port ${port}`);
});
