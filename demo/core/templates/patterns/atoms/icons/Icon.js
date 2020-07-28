import React from 'react';
import PropTypes from 'prop-types';

/**
 * Accessible icon component, built with <use> references to an inline SVG symbols sprite.
 */
const Icon = ({ name, className }) => (
    <svg
        className={`icon icon--${name} ${className || ''}`}
        aria-hidden="true"
        focusable="false"
    >
        <use xlinkHref={`#${name}`} />
    </svg>
);

export const ICONS = [
    'close',
    'cancel',
    'arrow',
    'microphone-on',
    'microphone-off',
    'phone',
    'fullscreen-enter',
    'fullscreen-exit',
    'off-site',
    'arrows',
    'information',
    'search',
    'arrow-right',
    'chevron-down',
    'chevron-right',
    'profile-avatar',
    'checkmark',
];

Icon.propTypes = {
    /**
     * Points at one of the icons from the symbols sprite.
     */
    name: PropTypes.oneOf(ICONS).isRequired,
    /**
     * Arbitrary classes.
     */
    className: PropTypes.string,
};

Icon.defaultProps = {
    className: null,
};

export default Icon;
