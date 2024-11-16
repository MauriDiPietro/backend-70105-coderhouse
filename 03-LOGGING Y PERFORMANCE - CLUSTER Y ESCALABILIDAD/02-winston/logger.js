import winston from 'winston';

const logConfig = {
    level: 'silly',
    transports: [
        new winston.transports.Console({ level: 'http' }),
        new winston.transports.File({
            filename: './log/error.log',
            level: 'error'
        }),
        new winston.transports.File({
            filename: './log/loggers.log'
        })
    ]
}

export const logger = winston.createLogger(logConfig);

// logger.level = 'debug'

// logger.silly('Imprimimos Silly');
// logger.debug('Imprimimos Debug');
// logger.verbose('Imprimimos Verbose');
// logger.info('Imprimimos Info');
// logger.http('Imprimimos http');
// logger.warn('Imprimimos Warn');
// logger.error('Imprimimos Error');