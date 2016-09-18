import cx from 'classnames';
import React, { Component, PropTypes } from 'react';

import SimpleComponent from '../AbstractSimpleComponent';

export class Grid extends SimpleComponent {
  constructor(props, context) {
    super(props, context, 'container');
  }
}

export class Row extends SimpleComponent {
  constructor(props, context) {
    super(props, context, 'row');
  }
}

export class Column extends SimpleComponent {
  constructor(props, context) {
    super(props, context, 'column');
  }
}
