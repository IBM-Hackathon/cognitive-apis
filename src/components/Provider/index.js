import React, { Component, PropTypes } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import IntlProvider from './intl-provider';

class Provider extends Component {
  static propTypes = {
    store: PropTypes.shape({
      subscribe: PropTypes.func.isRequired,
      dispatch: PropTypes.func.isRequired,
      getState: PropTypes.func.isRequired,
    }).isRequired,
    children: PropTypes.element.isRequired,
  };

  constructor(props, context) {
    super(props, context);
  };

  render() {
    return (
      <ReduxProvider store={this.props.store}>
        <IntlProvider>{this.props.children}</IntlProvider>
      </ReduxProvider>);
  }
}

export default Provider;
