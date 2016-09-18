import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';

class ProvideIntl extends Component {

  static propTypes = {
    ...IntlProvider.propTypes,
    children: PropTypes.element.isRequired,
  };

  constructor(props, context) {
    super(props, context);
  };

  render() {
    return (
      <IntlProvider {...this.props.intl} messages={this.props.intl.messages[this.props.intl.locale]}>
        {this.props.children}
      </IntlProvider>);
  }

}

export default ProvideIntl;
