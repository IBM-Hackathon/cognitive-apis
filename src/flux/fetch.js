import _ from 'lodash';
import _fetch from '../core/fetch';
import config from '../core/config';
import logger from '../core/logger';
import makeActionCreator from './make-action-creator';

const LOG = logger('CORE');

/*
 * data actions
 */
export const FETCH___ERROR = makeActionCreator('FETCH_ERROR', 'entity', 'error');
export const FETCH___START = makeActionCreator('FETCH_START', 'entity');
export const FETCH___SUCCESS = makeActionCreator('FETCH_SUCCESS', 'entity', 'result');

/*
 *
 */
export default function (entity, options, transform, _actions = {}) {
  const actions = _.assign({}, {
    error: FETCH___ERROR,
    start: FETCH___START,
    success: FETCH___SUCCESS
  }, _actions);

  return async (dispatch) => {
    dispatch(actions.start.create(entity));

    try {
      let //
        url,
        requestOptions;

      if (_.isString(options)) {
        url = options;
      } else {
        url = options.url;
        requestOptions = _.omit(options, 'url');
      }

      // LOG.debug(`Fetch data from ${url}`, requestOptions);

      const resp = await _fetch(url, requestOptions);

      if (resp.status != 200) {
        dispatch(actions.error.create(entity, resp.statusText));
        return false;
      } else {
        const result = await resp.json();
        dispatch(actions.success.create(entity, _.isFunction(transform) ? transform(result) : result));
        return true;
      }
    } catch (error) {
      dispatch(actions.error.create(entity, error));
      return false;
    }
  };
}
