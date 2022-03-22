import React from 'react';
import { Pattern } from '../../../../../../src/react';

import docs from './quote_block.md';
import template from './quote_block.html';

export default {
  parameters: {
    docs: {
      source: { code: template },
      extractComponentDescription: () => docs,
    },
  },
  argTypes: {
    quote: {
      control: { type: 'text' },
      description: 'Will be displayed first',
    },
    attribution: {
      control: { type: 'text' },
      description: 'Underneath the quote (optional)',
    },
  },
};

export const Base = (args) => (
  <Pattern filename={__filename} context={{ value: args }} />
);

Base.args = {
  quote: 'Someone believed in me once and now it’s time for me to do the same.',
  attribution: 'Young person',
};

export const NoAttribution = Base.bind({});

NoAttribution.args = {
  quote: Base.args.quote,
  attribution: null,
};
