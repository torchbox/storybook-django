import iconSprite from '../core/templates/patterns/sprites/sprites.html';

import '../static_src/main';

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

// Add icons to the page
const hasIcons = document.querySelector('[data-storybook-svg-icons]');

if (!hasIcons) {
  const icons = document.createElement('div');
  icons.setAttribute('data-storybook-svg-icons', 'true');
  icons.innerHTML = iconSprite;
  document.body.appendChild(icons);
}

export default preview;
