import _ from 'lodash';
import dateformat from 'dateformat';
import indent from 'indent-string';

export default (input) => {
  const date = `[${dateformat(new Date(), 'isoDateTime')}]`;
  const category = input.category ? `[${input.category}]` : '';
  const level = `[${input.level.substr(0, 3).toUpperCase()}]`;
  /* eslint-disable */
  const meta = _.keys(input.meta).length > 0 ? '\r\n' + `${indent(JSON.stringify(input.meta, null, 2), 1, '|')}` : '';
  /* eslint-enable */
  const message = `${input.message}${meta}`;

  const result = `${date}${level}${category} - ${message}`;

  return result;
};
