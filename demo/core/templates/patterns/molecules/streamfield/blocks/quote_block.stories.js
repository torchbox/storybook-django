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
                quote={text('quote', 'Comedy = Tragedy + Time')}
                attribution={text(
                    'attribution',
                    'Bekah / Tig Notaro / Carol Burnett / Steve Allen',
                )}
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
