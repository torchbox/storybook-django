import React from 'react';

import { Pattern } from '../../../../../../src/storybook-django';

import docs from './quote_block.md';
import template from './quote_block.html';

const Block = (props) => <Pattern filename={__filename} value={props} />;

export default {
    title: 'StreamField / quote_block',
    component: Block,
    argTypes: {
        quote: { control: { type: 'text' } },
        attribution: { control: { type: 'text' } },
    },
};

export const Default = (args) => <Block {...args} />;
Default.args = {
    quote:
        'Someone believed in me once and now it’s time for me to do the same.',
    attribution: 'Young person',
};

Default.parameters = {
    docs: {
        source: { code: template },
        extractComponentDescription: () => docs,
    },
};
