import React from 'react';
import { Pattern, generateDocs } from '../../../../../../src/react';

import template from './split_banner.html';

const { docs, argTypes } = generateDocs(template);

export default {
  title: 'Split Banner',
  parameters: { docs },
  argTypes,
};

export const Base = (args) => (
  <Pattern
    filename={__filename}
    tags={{
      image: {
        'image fill-889x500 class="split-banner__image" alt=""': {
          raw: '<img src="https://source.unsplash.com/M_sreLCqT6k/889x500" width="889" height="500" class="split-banner__image" alt="">',
        },
      },
    }}
    context={args}
  />
);
Base.args = {
  title: 'Whisperly Ltd',
  description: 'Stories from our Salesforce migration',
};
