/**
 * (c) michael.wellner@de.ibm.com 2016
 *
 * This facate of the fetch module adds some support for easier fetch calls.
 *
 * If fetch is called with a Java Object (without the key 'method') it's interpreted as
 * payload. In that case the request automatically is tunred into a POST request including
 * the passed object as JSON content.
 */
import _ from 'lodash';
import fetch from './internal';

export default (url, options, method = 'POST') => {
  let newOptions = options;

  if (_.isObject(options) && !_.isString(options.method)) {
    newOptions = {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(options)
    };
  }

  return fetch(url, newOptions);
};
