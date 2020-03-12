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
    const rawYaml = require(`!!raw-loader!../core/templates/patterns/${cleanPath}.yaml`);

    const usage = Object.keys(yaml.context)
        .map((key) => {
            const val = yaml.context[key];
            const wrappedVal = typeof val === 'string' ? `"${val}"` : val;
            return `${key}=${wrappedVal}`;
        })
        .join(' ');

    storiesOf(`Legacy / ${pathElts.join('/')}`, module).add(
        filename,
        () => {
            return (
                <TemplatePattern
                    template={`patterns/${cleanPath}.html`}
                    context={yaml.context}
                    tags={yaml.tags}
                />
            );
        },
        {
            notes: {
                markdown: `
                ### Usage (experimental)

                \`\`\`html\n{% include "patterns/${cleanPath}.html" with ${usage} %}\n\`\`\`

                ### Source

                \`\`\`html\n${source.default}\n\`\`\`

                ### YAML

                \`\`\`yaml\n${rawYaml.default}\n\`\`\``,
            },
        },
    );
});
