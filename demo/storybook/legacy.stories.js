import { storiesOf } from '@storybook/react';
import React from 'react';

import { TemplatePattern } from '../../src/storybook-django';

import '../core/templates/patterns/base.html';
import '../core/templates/patterns/base_page.html';

const req = require.context('../core/templates/patterns', true, /\.ya?ml$/);

req.keys().forEach((path) => {
    const yaml = req(path);
    const cleanPath = path.replace('./', '').replace('.yaml', '');
    const pathElts = cleanPath.split('/');
    const filename = pathElts.pop();
    const source = require(`../core/templates/patterns/${cleanPath}.html`);

    storiesOf(`Legacy / ${pathElts.join('/')}`, module).add(
        filename,
        () => {
            return (
                <TemplatePattern
                    apiPath="/storybook/api/v1/pattern-library/"
                    template={`patterns/${cleanPath}.html`}
                    context={yaml.context}
                    tags={yaml.tags}
                />
            );
        },
        {
            notes: {
                markdown: `
                \`\`\`html\n${source.default}\n\`\`\`

                \`\`\`yaml\n${JSON.stringify(yaml, null, 2)}\n\`\`\``,
            },
        },
    );
});
