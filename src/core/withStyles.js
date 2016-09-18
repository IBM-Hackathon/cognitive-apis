import _ from 'lodash';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

export default (style) => (component) => {
    const wrapper = withStyles(style)(component);
    wrapper.propTypes = _.assign({}, wrapper.propTypes || {}, component.propTypes || {});
    return wrapper;
};
