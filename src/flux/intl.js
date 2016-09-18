import _ from 'lodash';
import fetch from '../core/fetch';
import makeActionCreator from './make-action-creator';

/*
 * actions
 */
export const INTL_SET_LOCALE_ERROR = makeActionCreator('INTL_SET_LOCALE_ERROR', 'locale', 'error');
export const INTL_SET_LOCALE_START = makeActionCreator('INTL_SET_LOCALE_START', 'locale');
export const INTL_SET_LOCALE_SUCCESS = makeActionCreator('INTL_SET_LOCALE_SUCCESS', 'locale', 'messages');

/*
 * a delayed action (see https://github.com/gaearon/redux-thunk)
 */
export function setLocale({ locale }) {
  return async (dispatch) => {
    dispatch(INTL_SET_LOCALE_START.create(locale));

    try {
      const resp = await fetch(`/api/intl/${locale}`);
      if (resp.status !== 200) {
        throw new Error(resp.statusText);
      }

      const messages = await resp.json();

      dispatch(INTL_SET_LOCALE_SUCCESS.create(locale, messages));

      // remember locale for every new request
      if (process.env.BROWSER) {
        const maxAge = 3650 * 24 * 3600; // 10 years in seconds
        document.cookie = `lang=${locale};path=/;max-age=${maxAge}`;
      }
    } catch (error) {
      dispatch(INTL_SET_LOCALE_ERROR.create(locale, error));
      return false;
    }

    return true;
  };
}

/*
 * initial state
 */
const initialState = {
  messages: {}
};

/*
 * reducer
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case INTL_SET_LOCALE_SUCCESS.type:
      return {
        locale: action.locale,
        messages: _.assign({}, state.messages, {
          [action.locale]: action.messages
        })
      };
    case INTL_SET_LOCALE_ERROR.type:
      return _.omit(state, 'newLocale');
    case INTL_SET_LOCALE_START.type:
      return {
        locale: action.locale || state.locale,
        messages: state.messages,
        newLocale: action.locale
      };
    default:
      return state;
  }
}
