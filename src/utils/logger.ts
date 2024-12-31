import { environment } from '@src/core/config/environment';
import pino from 'pino';

const isProduction = environment === 'production';
const logLevel = process.env.LOG_LEVEL || (isProduction ? 'error' : 'info');

const logger = pino({
  level: logLevel,
  transport: isProduction ? undefined : {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:standard',
    },
  },
});

export default logger;