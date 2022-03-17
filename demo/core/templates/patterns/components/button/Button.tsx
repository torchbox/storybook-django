/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import Icon, { IconName } from '../icon/Icon';

const THEMES = {
    default: 'button',
    primary: 'button button--primary',
    ghost: 'button button--primary-ghost',
    secondary: 'button button--secondary',
    secondaryGhost: 'button button--secondary-ghost',
} as const;
type Theme = keyof typeof THEMES;
export const BUTTON_THEMES = Object.keys(THEMES);

interface ButtonProps {
    children: React.ReactNode;
    to?: string;
    href?: string;
    theme?: Theme;
    className?: string;
    target?: string;
    rel?: string;
    icon?: IconName;
    iconBefore?: IconName;
    iconAfter?: IconName;
}

const Button = ({
    children,
    to,
    href,
    theme = 'default',
    className,
    icon,
    iconBefore,
    iconAfter,
    ...rest
}: ButtonProps) => {
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

export default Button;
