import { Provider } from 'react-redux'; // eslint-disable-line
import React, { Component, PropTypes } from 'react'; // eslint-disable-line

import App from '../components/App';
import Unmut from './unmut';

export default {

  path: '/',

  children: [
    {
      path: '/',

      async action() {
        return {
          title: 'IBM Cognitive APIs - Unmut',
          content: <Unmut />
        };
      }
    }
  ],

  async action({ next, render, context }) {
    let component = await next();
    if (component === undefined) return component;

    return render(
      <App context={ context } content={ component } />
    );
  },

};
