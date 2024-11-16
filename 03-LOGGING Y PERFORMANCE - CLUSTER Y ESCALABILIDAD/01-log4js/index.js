import log4js from 'log4js';

log4js.configure({
    appenders:{
        fileAppender: {
            type: 'file', filename: './logs/ejemplo1.log'
        },
        consoleAppender: {
            type: 'console'
        }
    },
    categories: {
        default: { appenders: ['fileAppender', 'consoleAppender'], level: 'debug' },
        prod: { appenders: ['fileAppender'], level: 'warn' }
    }
})

const ENV = 'prod'

const logger = log4js.getLogger(ENV === 'dev' ? 'default' : 'prod');

// logger.level = 'debug'


logger.trace("Entering cheese testing");
logger.debug("Got cheese.");
logger.info("Cheese is Comté.");
logger.warn("Cheese is quite smelly.");
logger.error("Cheese is too ripe!");
logger.fatal("Cheese was breeding ground for listeria.");

// try {
//     const response = await Service.registerUser()
//     logger.info(`Usuario registered ${response.id}`)
// } catch (error) {
//     logger.error(error.message)
//     throw new Error(error)
// }