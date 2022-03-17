import React from 'react';

import { TemplatePattern } from '../../../../../storybook/TemplatePattern';

import Icon from './Icon';
import iconTemplate from './icon.html';

const ICONS = [
  ...document.querySelectorAll('[data-storybook-svg-icons] symbol'),
].map((symbol) => symbol.id);

export default {
  title: 'Icon',
  component: Icon,
};

export const Default = (args) => <Icon name="profile-avatar" {...args} />;

export const ViewAllReact = () =>
  ICONS.map((icon) => (
    <div
      key={icon}
      style={{
        marginBottom: '20px',
        display: 'grid',
        gridTemplateColumns: '1fr 3fr',
      }}
    >
      <Icon name={icon} />
      <div>
        <code>{`<Icon name="${icon}" />`}</code>
      </div>
    </div>
  ));

ViewAllReact.storyName = 'View all (React)';

const path = 'patterns/components/icon/icon.html';

const IconPattern = (props) => (
  <TemplatePattern element="span" template={path} context={props} />
);

export const ViewAllDjango = () =>
  ICONS.map((icon) => (
    <div
      key={icon}
      style={{
        marginBottom: '20px',
        display: 'grid',
        gridTemplateColumns: '1fr 3fr',
      }}
    >
      <IconPattern name={icon} />
      <div>
        <code>{`{% include "patterns/components/icon/icon.html" with name="${icon}" %}`}</code>
      </div>
    </div>
  ));

ViewAllDjango.storyName = 'View all (Django)';

ViewAllDjango.parameters = {
  docs: { source: { code: iconTemplate } },
};
