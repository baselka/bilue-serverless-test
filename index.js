import express from 'express';
import 'express-async-errors';
import BodyParser from 'body-parser';
import cors from 'cors';
import logSymbols from 'log-symbols';
import { errorHandler } from './src/middlewares/error-handler.js';
import { NotFoundError } from './src/errors/index.js';
import { AuthRouter, Weather } from './src/routes/v1/index.js';
import { Config } from './src/config/index.js';
import  logger  from './src/utils/logger.js';
import httpLogger from './src/utils/http-logger.js';
import serverless from 'serverless-http';

const {PORT, ENV, API_PREFIX, API_VERSION} = Config
// initialize Express App
const app = express();
const { json } = BodyParser;
app.options('*', cors())
app.set('trust proxy', true);
app.use(json());
app.use(httpLogger);

// CORS config
app.use(function(req, res, next) {
    res.set({ 'content-type': 'application/json; charset=utf-8' });
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

// Use Defined routes by express
app.get(`${API_PREFIX}/${API_VERSION}`, (req, res) => {
  res.json({ message: `Bilue Weather API`});
});

app.use(AuthRouter, Weather);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  app.listen(PORT, () => {
    logger.info(`${logSymbols.success} Bilue Serverless Weather API @${PORT}!. ${logSymbols.success}`);
  });
};


if (ENV == 'dev') {
  start();    
}

export const handler = serverless(app);
