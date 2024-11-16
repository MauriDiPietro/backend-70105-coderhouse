import {createLogger, transports, format} from 'winston';

const { combine, printf, timestamp, colorize } = format;

const logConfig = {
    format: combine(
        timestamp({
            format: 'MM-DD-YYYY HH:mm:ss'
        }),
        colorize(),
        //{"level":"error","message":"Imprimimos Error"}
        printf((log)=>`${log.level} | ${log.timestamp} | ${log.message}`)
    ), 
    transports: [
        new transports.Console({ level: 'silly' }),
    ]
}

const logger = createLogger(logConfig);

logger.level = 'debug'

logger.silly('Imprimimos Silly');
logger.debug('Imprimimos Debug');
logger.verbose('Imprimimos Verbose');
logger.info('Imprimimos Info');
logger.http('Imprimimos http');
logger.warn('Imprimimos Warn');
logger.error('Imprimimos Error');