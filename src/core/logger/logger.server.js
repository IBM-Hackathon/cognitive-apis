import _ from 'lodash';
import config from '../../core/config';
import formatter from './formatter';
import winston from 'winston';

/**
 * Configuration of different appenders for logging
 */
const consoleConfiguration = {
  level: config.get('LOG.LEVEL', 'info'),
  silent: !(config.get('LOG.CONSOLE', false)),
  stderrLevels: [],
  formatter
};

const fileConfiguration = {
  level: config.get('LOG.FILE.LEVEL', config.get('LOG.LEVEL')),
  silent: !config.has('LOG.FILE'),
  filename: config.get('LOG.FILE.FILENAME', 'application.log'),
  json: false,
  timestamp: true,
  maxsize: config.get('LOG.FILE.FILESIZE', 10 * 1024 * 1024),
  maxFiles: config.get('LOG.FILE.MAXFILES', 1),
  tailable: true,
  formatter
};

/**
 * Configuration of winston
 */
try {
  winston.remove(winston.transports.File);
  winston.remove(winston.transports.Console);
} catch (err) {
  // Do nothing ...
}

try {
  winston.add(winston.transports.Console, consoleConfiguration);
  winston.add(winston.transports.File, fileConfiguration);
} catch (err) {
  // Do nothing ...
}

_.each(config.get('LOG.CATEGORIES', {}), (enabled, category) => {
  _.each(['SERVER', 'CLIENT'], (component) => {
    const categoryFormatter = (next) => (message) => {
      const newMessage = _.assign(message, {
        category: `${component}::${category}`
      });

      return _.isFunction(next) ? next(newMessage) : newMessage;
    };

    const overrideConfiguration = (configuration) => ({
      level: enabled ? configuration.level : 'error',
      formatter: categoryFormatter(configuration.formatter)
    });

    const loggerConfiguration = {
      console: _.assign({}, consoleConfiguration, overrideConfiguration(consoleConfiguration)),
      file: _.assign({}, fileConfiguration, overrideConfiguration(fileConfiguration))
    };

    winston.loggers.add(`${component}::${category}`, loggerConfiguration);
  });
});

export default (category, component = 'SERVER') => winston.loggers.get(`${component}::${category}`);
