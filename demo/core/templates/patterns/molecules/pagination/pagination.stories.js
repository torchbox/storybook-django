import React from 'react';

import { TemplatePattern } from '../../../../../../src/storybook-django';

import './pagination.html';
import config from './pagination.yaml';

const template = __filename
    .replace('demo/core/templates/', '')
    .replace('.stories.js', '.html');

const Pagination = ({ tags = [], ...props }) => (
    <TemplatePattern
        apiPath="/api/v1/pattern-library/"
        template={template}
        context={props}
        tags={tags}
    />
);

export default {
    component: Pagination,
    title: 'pagination',
};

export const fromYAML = () => <Pagination {...config.context} />;
