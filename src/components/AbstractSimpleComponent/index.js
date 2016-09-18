import cx from 'classnames';
import React, { Component, PropTypes } from 'react';

class SimpleComponent extends Component {
  static propTypes = {
    children: PropTypes.any,
    className: PropTypes.string
  };

  constructor(props, context, classnames) {
    super(props, context);
    this.classnames = classnames;
  }

  render() {
    const classnames = cx({
      [this.classnames]: true,
      [this.props.className]: this.props.className !== undefined && this.props.className.length > 0
    });

    return <div className={ classnames }>{ this.props.children }</div>;
  }
}

export default SimpleComponent;
