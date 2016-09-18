import _ from 'lodash';

export default {
  get(key, defaultValue) {
    const result = _.get(CLIENT_CONFIG, key, defaultValue);

    if (!result) {
      throw new Error(`Mandatory configuration key "${key}" is undefined.`);
    }

    return result;
  },

  has(key) {
    return _.has(CLIENT_CONFIG, key);
  }
};
