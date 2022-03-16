import React from 'react';
import { Pattern } from '../../../../../storybook/TemplatePattern';

import template from './split_banner.html';

// eslint-disable-next-line react/jsx-props-no-spreading
const SplitBanner = (props) => <Pattern filename={__filename} {...props} />;

export default {
    title: 'Split Banner',
    component: SplitBanner,
    argTypes: {
        title: { control: { type: 'text' } },
        description: { control: { type: 'text' } },
    },
};

export const Default = (args) => (
    <SplitBanner
        tags={{
          image: {
            'image fill-889x500 class="split-banner__image" alt=""': {
              raw: '<img src="https://source.unsplash.com/M_sreLCqT6k/889x500" width="889" height="500" class="split-banner__image" alt="">'
            }
          }
        }}
        {...args}
    />
);
Default.args = {
    title: 'Whisperly Ltd',
    description: 'Stories from our Salesforce migration',
};

Default.parameters = {
    docs: {
        source: { code: template },
    },
};
