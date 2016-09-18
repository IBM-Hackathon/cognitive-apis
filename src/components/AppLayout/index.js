import React, { Component, PropTypes } from 'react';

import _ from 'lodash';
import cx from 'classnames';
import styles from './styles.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import brandUrl from './brand.svg';
import routes from '../../routes';

import { Grid, Row, Column } from './../Grid';

class AppLayout extends Component {

  static propTypes = {
    content: PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.element.isRequired
    })
  };

  static contextTypes = {
    setTitle: PropTypes.func
  }

  constructor(props, context) {
    super(props, context);
    this.setTitle = () => {
      this.context.setTitle(this.props.content.title);
    };
  }

  render() {
    this.setTitle();

    return (
      <div className={ styles.root }>
        <div className={ styles.header }>
          <Grid>
            <Row>
              <Column>
                <h1><span>IBM</span> Cognitive Services</h1>
              </Column>
            </Row>

          </Grid>
        </div>

        <div className={ styles['content-container'] }>
          <div className={ styles['content-wrapper'] }>
            <div className={ styles['content'] }>
              { this.props.content.content }
            </div>

            <div className={ styles.footer }>
              Lorem Ipsum Footer
            </div>
          </div>
        </div>
      </div>);
  }
}

export default withStyles(styles)(AppLayout);
