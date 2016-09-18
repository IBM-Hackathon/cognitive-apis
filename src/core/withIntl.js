import _ from 'lodash';
import { injectIntl } from 'react-intl';

export default (component) => {
  const wrapper = injectIntl(component);
  wrapper.propTypes = _.assign({}, wrapper.propTypes || {}, component.propTypes || {})
  return wrapper;
}
