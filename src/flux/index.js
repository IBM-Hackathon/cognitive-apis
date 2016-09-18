import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import reduxLogger from 'redux-logger';
import thunk from 'redux-thunk';

/* initial actions */
import runtime, { RUNTIME_SET_VARIABLE } from './runtime';
import intl, { setLocale } from './intl';

const rootReducer = combineReducers({
  intl,
  runtime
});

const middleware = [thunk];

let enhancer;

if (__DEV__ && process.env.BROWSER) {
  const logger = reduxLogger({
    collapsed: true,
  });
  middleware.push(logger);

  enhancer = compose(
    applyMiddleware(...middleware),

    // https://github.com/zalmoxisus/redux-devtools-extension#redux-devtools-extension
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  );
} else {
  enhancer = applyMiddleware(...middleware);
}

export function initialStoreActions(params) {
  return async (dispatch) => {
    dispatch(RUNTIME_SET_VARIABLE.create('initialNow', Date.now()));
    dispatch(RUNTIME_SET_VARIABLE.create('availableLocales', params.locales));

    await dispatch(setLocale({
      locale: params.locale
    }));
  };
}

export default function configureStore(initialState) {
  // Note: only Redux >= 3.1.0 supports passing enhancer as third argument.
  // See https://github.com/rackt/redux/releases/tag/v3.1.0
  return createStore(rootReducer, initialState, enhancer);
}
