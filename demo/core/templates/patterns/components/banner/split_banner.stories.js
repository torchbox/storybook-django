import React from 'react';
import { Pattern } from '../../../../../../src/storybook-django';

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
        img={{
            url: 'https://source.unsplash.com/M_sreLCqT6k/870x500',
            width: 870,
            height: 500,
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
