import { Grid, Column, Row } from '../Grid';
import React from 'react';

import styles from './styles.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

const component = (props) => <div className={ styles.root }><Grid><Row><Column>{ props.children }</Column></Row></Grid></div>;

component.propTypes = {
  children: React.PropTypes.element
};

export default withStyles(styles)(component);
