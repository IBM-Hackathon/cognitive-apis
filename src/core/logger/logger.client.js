import _ from 'lodash';
import fetch from '../fetch';
import formatter from './formatter';

export default (category) => {
  return _.reduce(['silly', 'debug', 'info', 'warn', 'error'], (obj, level) => {
    return _.assign({}, obj, {
      [level]: (message, meta) => {
        const data = {
          category,
          level,
          meta,
          message
        };

        fetch('/api/log', data);

        if (_.isFunction(console[level])) {
          console[level](formatter(data));
        } else {
          console.log(formatter(data));
        }
      }
    });
  }, {});
};
