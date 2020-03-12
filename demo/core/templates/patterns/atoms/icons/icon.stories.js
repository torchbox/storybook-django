import React from 'react';

import { TemplatePattern } from '../../../../../../src/storybook-django';

import './icon.html';

const IconPattern = (props) => (
    <TemplatePattern
        template="patterns/atoms/icons/icon.html"
        context={props}
    />
);

const ICONS = [
    ...document.querySelectorAll('[data-storybook-svg-icons] symbol'),
].map((symbol) => symbol.id);

export default {
    component: IconPattern,
    title: 'icon',
};

export const allIcons = () =>
    ICONS.map((icon) => (
        <div key={icon}>
            <IconPattern name={icon} />
            <code>{icon}</code>
        </div>
    ));
