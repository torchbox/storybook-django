import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../../atoms/icons/Icon';
import Button from '../button/Button';

const THEMES = {
    default: 'info-box info-box--default',
    checkmark: 'info-box info-box--checkmark',
};

const THEME_ICONS = {
    default: 'information',
    checkmark: 'checkmark',
};

export const INFOBOX_THEMES = Object.keys(THEMES);

/**
 * A wrapper for arbitrary rich text content, usually displayed in a sidebar.
 * Can optionally have a call to action link at the bottom.
 */
const InfoBox = ({ children, ctaLabel, ctaTo, ctaHref, theme, className }) => {
    const infoBoxClassName = `${THEMES[theme]} ${className || ''}`;
    const iconName = THEME_ICONS[theme];

    return (
        <aside className={infoBoxClassName}>
            <Icon name={iconName} className="info-box__icon" />
            {children}
            {ctaLabel ? (
                <div className="info-box__cta">
                    <Button
                        iconAfter="chevron-right"
                        to={ctaTo}
                        href={ctaHref}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {ctaLabel}
                    </Button>
                </div>
            ) : null}
        </aside>
    );
};

InfoBox.propTypes = {
    children: PropTypes.node.isRequired,
    ctaLabel: PropTypes.string,
    ctaTo: PropTypes.string,
    ctaHref: PropTypes.string,
    theme: PropTypes.oneOf(INFOBOX_THEMES),
    className: PropTypes.string,
};

InfoBox.defaultProps = {
    ctaLabel: null,
    ctaTo: null,
    ctaHref: null,
    theme: 'default',
    className: null,
};

export default InfoBox;
