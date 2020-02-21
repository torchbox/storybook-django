import React from 'react';
import PropTypes from 'prop-types';

/**
 * Accessible icon component, loading icons from separate sprite.
 */
const Icon = ({ name, className }) => (
    <svg className={`icon icon--${name} ${className || ''}`} aria-hidden="true">
        <use xlinkHref={`#${name}`} />
    </svg>
);

Icon.propTypes = {
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
};

Icon.defaultProps = {
    className: null,
};

export default Icon;
