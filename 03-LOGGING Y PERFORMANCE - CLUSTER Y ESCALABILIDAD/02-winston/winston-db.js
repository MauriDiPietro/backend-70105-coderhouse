import winston from "winston";
import 'winston-mongodb';

const logConfig = {
    transports: [
        winston.add(new winston.transports.MongoDB({
            // options: { useUnifiedTopology: true },
            db: 'mongodb://localhost:27017/coderhouse',
            collection: 'logs-coder',
            tryReconnect: true,
            level: 'error'
        }))
    ]
}

const logger = winston.createLogger(logConfig);

logger.level = 'debug'

logger.silly('Imprimimos Silly');
logger.debug('Imprimimos Debug');
logger.verbose('Imprimimos Verbose');
logger.info('Imprimimos Info');
logger.http('Imprimimos http');
logger.warn('Imprimimos Warn');
logger.error('Imprimimos Error');