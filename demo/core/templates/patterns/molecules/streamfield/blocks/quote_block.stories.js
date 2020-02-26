import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';

import { TemplatePattern } from '../../../../../../../src/storybook-django';

import docs from './quote_block.md';
import source from './quote_block.html';

const Block = (props) => (
    <TemplatePattern
        apiPath="/api/v1/pattern-library/"
        template="patterns/molecules/streamfield/blocks/quote_block.html"
        context={{
            value: props,
        }}
    />
);

storiesOf('StreamField', module)
    .addDecorator(withKnobs)
    .add(
        'quote_block',
        () => (
            <Block
                quote={text('quote', 'Some quote')}
                attribution={text('attribution', 'Some attribution')}
            />
        ),
        {
            notes: {
                markdown: `
                    ${docs}

                    \`\`\`html
                    ${source}
                    \`\`\`
                    `,
            },
        },
    );
