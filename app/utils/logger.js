const winston = require('winston');

const options = {
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.cli({
        colors: {
          error: 'red',
          warn: 'yellow',
          info: 'blue',
          debug: 'white',
          http: 'green',
          verbose: 'cyan'
        }
      })
    )
  }
};

const logger = winston.createLogger({
  levels: winston.config.npm.levels,
  transports: [new winston.transports.Console(options.console)],
  exitOnError: false
});

module.exports = logger;
