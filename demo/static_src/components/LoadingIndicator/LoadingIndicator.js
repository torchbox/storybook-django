import React from 'react';
import PropTypes from 'prop-types';

const THEMES = {
    centre: 'loading-indicator loading-indicator--centre',
    left: 'loading-indicator loading-indicator--left',
};
export const INDICATOR_THEMES = Object.keys(THEMES);

/**
 * This component uses markup generated from https://loading.io
 */
const LoadingIndicator = ({ children, theme, className }) => {
    const indicatorClassName = `${THEMES[theme]} ${className || ''}`;

    return (
        <div className={indicatorClassName}>
            <div className="loading-indicator__animation" aria-hidden="true">
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
            </div>
            <div className="loading-indicator__content">
                <h2 className="loading-indicator__heading">
                    Please wait one moment
                </h2>
                <p className="loading-indicator__message">{children}</p>
            </div>
        </div>
    );
};

LoadingIndicator.propTypes = {
    children: PropTypes.node,
    theme: PropTypes.oneOf(INDICATOR_THEMES),
    className: PropTypes.string,
};

LoadingIndicator.defaultProps = {
    children: null,
    theme: 'centre',
    className: null,
};

export default LoadingIndicator;
