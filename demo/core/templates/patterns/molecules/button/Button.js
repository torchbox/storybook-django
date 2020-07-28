import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';

import Icon from '../../atoms/icons/Icon';

const THEMES = {
    default: 'button',
    primary: 'button button--primary',
    ghost: 'button button--primary-ghost',
    secondary: 'button button--secondary',
    secondaryGhost: 'button button--secondary-ghost',
};
export const BUTTON_THEMES = Object.keys(THEMES);

const Button = ({
    children,
    to,
    href,
    theme,
    className,
    icon,
    iconBefore,
    iconAfter,
    ...rest
}) => {
    const btnClassName = `${THEMES[theme]} ${className || ''} ${
        icon ? 'button--icon-only' : ''
    }`;

    const contents = (
        <>
            {iconBefore ? (
                <Icon
                    name={iconBefore}
                    className="button__icon button__icon--before"
                />
            ) : null}
            {icon ? (
                <Icon
                    name={icon}
                    className="button__icon button__icon--center"
                />
            ) : (
                children
            )}
            {iconAfter ? (
                <Icon
                    name={iconAfter}
                    className="button__icon button__icon--after"
                />
            ) : null}
        </>
    );

    if (to) {
        return (
            <Link to={to} {...rest} className={btnClassName}>
                {contents}
            </Link>
        );
    }

    if (href) {
        return (
            <a href={href} {...rest} className={btnClassName}>
                {contents}
            </a>
        );
    }

    return (
        <button type="button" {...rest} className={btnClassName}>
            {contents}
        </button>
    );
};

const ICONS = [
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

Button.propTypes = {
    children: PropTypes.node,
    to: PropTypes.string,
    href: PropTypes.string,
    theme: PropTypes.oneOf(BUTTON_THEMES),
    className: PropTypes.string,
    icon: PropTypes.oneOf(ICONS),
    iconBefore: PropTypes.oneOf(ICONS),
    iconAfter: PropTypes.oneOf(ICONS),
};

Button.defaultProps = {
    children: null,
    to: null,
    href: null,
    theme: 'default',
    className: null,
    icon: null,
    iconBefore: null,
    iconAfter: null,
};

export default Button;
