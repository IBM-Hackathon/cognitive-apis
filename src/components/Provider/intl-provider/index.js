import { connect } from 'react-redux';
import Component from './component';

const mapStateToProps = (state) => {
  return {
    intl: state.intl
  }
};

const mapDispatchToProps = (dispatch) => {
  return {}
};

const VisibleComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);

export default VisibleComponent;
