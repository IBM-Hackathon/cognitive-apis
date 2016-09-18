/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import emptyFunction from 'fbjs/lib/emptyFunction';
import s from './App.css';
import globalStyles from './GlobalStyles.gcss';
import AppLayout from '../AppLayout';

class App extends Component {

  static propTypes = {
    context: PropTypes.shape({
      insertCss: PropTypes.func,
      setTitle: PropTypes.func,
      setMeta: PropTypes.func,
    }),
    children: PropTypes.node,
    error: PropTypes.object,
  };

  static childContextTypes = {
    insertCss: PropTypes.func.isRequired,
    setTitle: PropTypes.func.isRequired,
    setMeta: PropTypes.func.isRequired,
  };

  getChildContext() {
    const context = this.props.context;
    return {
      insertCss: context.insertCss || emptyFunction,
      setTitle: context.setTitle || emptyFunction,
      setMeta: context.setMeta || emptyFunction,
    };
  }

  componentWillMount() {
    const {insertCss} = this.props.context;
    this.removeCss = [];
    this.removeCss[0] = insertCss(s);
    this.removeCss[1] = insertCss(globalStyles);
  }

  componentWillUnmount() {
    this.removeCss[0]();
    this.removeCss[1]();
  }

  render() {
    return !this.props.error ? (
      <AppLayout children = { this.props.children } content={ this.props.content } />
      ) : this.props.children;
  }

}

export default App;
