import morgan from 'morgan';
import json from 'morgan-json';
import logger from './logger.js';

const format = json({
  method: ':method',
  url: ':url',
  status: ':status',
  contentLength: ':res[content-length]',
  responseTime: ':response-time'
})


const httpLogger = morgan(format, {
  stream: {
    write: (message) => {
      const {
        method,
        url,
        status,
        contentLength,
        responseTime
      } = JSON.parse(message)
      const httpLog = `HTTP Access Log ${JSON.stringify({
        //timestamp: new Date().toString(),
        method,
        url,
        status: Number(status),
        contentLength,
        responseTime: Number(responseTime)
      })}`;

      if( Number(status) !== 200){
        logger.error(httpLog);
      }else{
        logger.http(httpLog);
      }
    }
  }
})

export default httpLogger