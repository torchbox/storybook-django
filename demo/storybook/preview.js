import { configure } from '@storybook/react';

import iconSprite from '../core/templates/patterns/atoms/sprites/sprites.html';

const hasIcons = document.querySelector('[data-storybook-svg-icons]');

if (!hasIcons) {
    const icons = document.createElement('div');
    icons.setAttribute('data-storybook-svg-icons', true);
    icons.innerHTML = iconSprite;
    document.body.appendChild(icons);
}

require('../static_src/main');

window.PATTERN_LIBRARY_API = '/api/v1/pattern-library/';
window.PATTERN_LIBRARY_TEMPLATE_DIR = 'demo/core/templates/';
