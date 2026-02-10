// eslint-disable-next-line import/no-extraneous-dependencies
import { addons } from '@storybook/manager-api';

import theme from './theme';

addons.setConfig({
  theme,
});
