import {
  WinstonModule,
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston';
import * as winston from 'winston';

export const WinstonLogger = () =>
  WinstonModule.createLogger({
    transports: [
      new winston.transports.Console({
        debugStdout: true,
        level: 'debug',
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.ms(),
          nestWinstonModuleUtilities.format.nestLike()
        ),
      }),
    ],
  });
