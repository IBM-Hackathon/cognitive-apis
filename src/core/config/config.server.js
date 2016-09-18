/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 *
 *
 *
 * Note by michael.wellner@de.ibm.com:
 *
 * This config.js should not contain more than app's host, port and locales.
 * Please use /config directory for additional configuration.
 */
import _ from 'lodash';
import config from 'config';

const conf = {
  /**
   * Return value for key of config or a default value if set.
   *
   * @param key The configuration key used in the configuration JSON.
   * @param defaultValue Optional. The default value which should be returned if no value is defined for key.
   */
  get(key, defaultValue) {
    let result;

    if (defaultValue) {
      result = config.has(key) && config.get(key) || defaultValue;
    } else {
      result = config.get(key);
    }

    return result;
  },

  /**
   * Checks if a key is defined in confiuration. Returns true/ false.
   *
   * @param key The configuration key used in the configuration JSON.
   */
  has(key) {
    return config.has(key);
  },

  complete() {
    return _.assign({}, config);
  }
};

export const APP_PORT = process.env.PORT || config.get('APP.PORT');
export const APP_HOST = `${conf.get('APP.HOSTNAME', 'localhost')}:${APP_PORT}`;

// default locale is the first one
export const APP_LOCALES = config.get('APP.LOCALES');

/*
 * Overwrite behaviour of 'config' package.
 */
export default conf;
