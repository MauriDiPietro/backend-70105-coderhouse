import express from 'express';
import { initMongoDB } from './config/db-connection';
import { logger } from './logs/logger';
import { errorHandler } from './middlewares/error-handler';
import apiRouter from './routes/product-router'

const app = express();

app.use(express.json());

app.use('/api/products', apiRouter);

initMongoDB().then(()=>logger.info('Connect Mongo DB')).catch((error)=> console.log(error))

app.use(errorHandler);

app.listen(8080, ()=>logger.info('server ok'))
