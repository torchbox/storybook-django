import { Pattern } from '../../../../../../src/react';

import Button, { BUTTON_THEMES } from './Button';
import template from './button.html';

export default {
  title: 'Button',
  component: Button,
};

export const Base = (args) => <Button {...args} />;
Base.args = { children: 'Test button' };

export const ViewAllreact = () =>
  BUTTON_THEMES.map((theme) => (
    <Button key={theme} theme={theme}>
      {theme}
    </Button>
  ));

ViewAllreact.storyName = 'View All (React)';

export const ButtonIcons = () => (
  <>
    <p>Icon before:</p>
    <Button theme="secondaryGhost" iconBefore="off-site">
      View calendar
    </Button>
    <p>Icon after:</p>
    <Button theme="secondaryGhost" iconAfter="off-site">
      View calendar
    </Button>
    <p>Icon before & after:</p>
    <Button theme="secondaryGhost" iconBefore="off-site" iconAfter="off-site">
      View calendar
    </Button>
    <p>Icon only:</p>
    <Button theme="secondaryGhost" aria-label="View calendar" icon="off-site" />
  </>
);

export const ViewAllDjango = () =>
  BUTTON_THEMES.map((theme) => (
    <Pattern
      key={theme}
      element="span"
      filename={__filename}
      context={{
        label: theme,
        theme,
        target_url: '/',
      }}
    />
  ));

ViewAllDjango.storyName = 'View All (Django)';

ViewAllDjango.parameters = {
  docs: { source: { code: template } },
};
