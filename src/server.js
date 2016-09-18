/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import 'babel-polyfill';
import './serverIntlPolyfill';
import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import requestLanguage from 'express-request-language';
import bodyParser from 'body-parser';
import React from 'react';
import ReactDOM from 'react-dom/server';
import UniversalRouter from 'universal-router';
import PrettyError from 'pretty-error';
import routes from './routes';
import assets from './assets'; // eslint-disable-line import/no-unresolved
import config, { APP_LOCALES, APP_PORT, APP_HOST } from './core/config';
import flux, { initialStoreActions } from './flux';
import Provider from './components/Provider';
import logger from './core/logger';

import api from './api';
import mock from './api/rgf-mock';

const app = express();
const log = logger('CORE');

// Format JSON Output.
app.set('json spaces', 2);

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(requestLanguage({
  languages: APP_LOCALES,
  queryName: 'lang',
  cookie: {
    name: 'lang',
    options: {
      path: '/',
      maxAge: 3650 * 24 * 3600 * 1000, // 10 years in miliseconds
    },
    url: '/lang/{language}',
  },
}));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.use('/api', api);

if (config.get('RGF_MODUL.MOCK_ENABLED', false)) {
  const url = config.get('RGF_MODUL.URL');

  app.use(url, mock);
  log.info(`RGF Modul mock enabled on ${url}`);
}

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get('*', async (req, res, next) => {
  try {
    let css = [];
    let statusCode = 200;
    const template = require('./views/index.jade'); // eslint-disable-line global-require
    const locale = req.language;
    const data = {
      config: `var CLIENT_CONFIG = ${JSON.stringify(config.complete())};`,
      lang: locale,
      title: '',
      description: '',
      css: '',
      body: '',
      entry: assets.main.js,
      state: {}
    };

    const store = flux({});

    await initialStoreActions({
      locale,
      APP_LOCALES
    })(store.dispatch);

    await UniversalRouter.resolve(routes, {
      path: req.path,
      query: req.query,
      context: {
        store,
        insertCss: (...styles) => {
          styles.forEach(style => css.push(style._getCss())); // eslint-disable-line no-underscore-dangle, max-len
        },
        setTitle: value => (data.title = value),
        setMeta: (key, value) => (data[key] = value),
      },
      render(component, status = 200) {
        css = [];
        statusCode = status;

        // Fire all componentWill... hooks
        data.body = ReactDOM.renderToString(<Provider store={ store }>{ component }</Provider>);

        // If you have async actions, wait for store when stabilizes here.
        // This may be asynchronous loop if you have complicated structure.
        // Then render again

        // If store has no changes, you do not need render again!
        // data.body = ReactDOM.renderToString(<Provider store={store}>{component}</Provider>);

        // It is important to have rendered output and state in sync,
        // otherwise React will write error to console when mounting on client
        data.state = JSON.stringify(store.getState());

        data.css = css.join('');
        return true;
      },
    });

    res.status(statusCode);
    res.send(template(data));
  } catch (err) {
    next(err);
  }
});

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  log.error(pe.render(err));
  const template = require('./views/error.jade'); // eslint-disable-line global-require
  const statusCode = err.status || 500;
  res.status(statusCode);
  res.send(template({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '' : err.stack,
  }));
});

//
// Launch the server
// -----------------------------------------------------------------------------
export default app.listen(APP_PORT, () => {
  log.info(`The server is running at http://${APP_HOST}/`);
  log.info(`Running with NODE_ENV=${process.env.NODE_ENV}`);
});
