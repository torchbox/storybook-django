import iconSprite from '../core/templates/patterns/sprites/sprites.html';

const hasIcons = document.querySelector('[data-storybook-svg-icons]');

if (!hasIcons) {
  const icons = document.createElement('div');
  icons.setAttribute('data-storybook-svg-icons', true);
  icons.innerHTML = iconSprite;
  document.body.appendChild(icons);
}

require('../static_src/main');
