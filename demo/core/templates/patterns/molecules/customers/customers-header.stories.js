import React from 'react';

import { TemplatePattern } from '../../../../../../src/storybook-django';

import './customers-header.html';

const Header = ({ tags = [], ...props }) => (
    <TemplatePattern
        apiPath="/storybook/api/v1/pattern-library/"
        template={__filename
            .replace('demo/core/templates/', '')
            .replace('.stories.js', '.html')}
        context={props}
        tags={tags}
    />
);

export default {
    component: Header,
    title: 'Customers',
};

export const header = () => (
    <Header request={{ path: 'test' }} search_query="Potato" />
);
