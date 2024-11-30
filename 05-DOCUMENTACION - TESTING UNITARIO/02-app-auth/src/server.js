import express from "express";
import session from 'express-session'
import cookieParser from "cookie-parser";
import passport from 'passport';
import MongoStore from 'connect-mongo';
import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import 'dotenv/config';
import './passport/jwt.js';
import usersRouter from "./routes/users.router.js";
import { initMongoDB } from "./db/connection.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { info } from './docs/info.js';

const app = express();

const specs = swaggerJSDoc(info);

app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs));

const storeConfig = {
  store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      crypto: { secret: process.env.SECRET_KEY },
      ttl: 180,
  }),
  secret: process.env.SECRET_KEY,
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 180000 }
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(session(storeConfig));

app.use(passport.initialize());
app.use(passport.session());

app.use("/users", usersRouter);

app.use(errorHandler);

initMongoDB().then(()=>console.log('base de datos coenctada'))
  .catch((error)=>console.log(error))

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Escuchando al puerto ${PORT}`);
});
