import express from 'express';
import { loggerHttp } from './loggerHttp.js';
import morgan from 'morgan'

const app = express();

app.use(loggerHttp)
app.use(morgan('dev'))

app.get('/', (req, res)=>{
    res.send('hola')
})

app.get('/ruta2', (req, res)=>{
    res.send('hola')
})

app.listen(8080)