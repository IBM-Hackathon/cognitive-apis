import { connect } from 'react-redux';
import Component from './component';

const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // onChangeQuery: (event, value) => dispatch(UI_ORDERS___UPDATE_QUERY.create(value)),
  };
};

const VisibleComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);

export default VisibleComponent;
