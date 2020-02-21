import { storiesOf } from '@storybook/react';
import React from 'react';

import Icon from './Icon';

const ICONS = [
    ...document.querySelectorAll('[data-storybook-svg-icons] symbol'),
].map((symbol) => symbol.id);

storiesOf('Icon', module).add('All icons (React)', () =>
    ICONS.map((icon) => (
        <div key={icon}>
            <Icon name={icon} />
            <br />
            <code>{icon}</code>
        </div>
    )),
);
