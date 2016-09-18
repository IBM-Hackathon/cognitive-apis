import _ from 'lodash';
import makeActionCreator from './make-action-creator';

/*
 * actions
 */
export const RUNTIME_SET_VARIABLE = makeActionCreator('RUNTIME_SET_VARIABLE', 'name', 'value');

/*
 * reducer
 */
export default function(state = {}, {type, name, value}) {
  switch (type) {
    case RUNTIME_SET_VARIABLE.type:
      return _.assign({}, state, {
        [name]: value
      });
    default:
      return state;
  }
}
