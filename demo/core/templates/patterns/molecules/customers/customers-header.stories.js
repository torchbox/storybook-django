import React from 'react';

import { Pattern } from '../../../../../../src/storybook-django';

import './customers-header.html';

export default { component: Pattern, title: 'Customers' };

export const header = () => (
    <Pattern
        filename={__filename}
        request={{ path: 'test' }}
        search_query="Potato"
    />
);
