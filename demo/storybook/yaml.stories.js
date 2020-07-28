import { storiesOf } from '@storybook/react';
import React from 'react';
// import { text, number, array, object } from '@storybook/addon-knobs';
import {
    Title,
    Subtitle,
    Description,
    Primary,
    Props,
    Stories,
} from '@storybook/addon-docs/blocks';

import { TemplatePattern } from '../../src/storybook-django';

import '../core/templates/patterns/base.html';

const req = require.context('../core/templates/patterns', true, /\.yaml$/);

const argTypesify = (obj) => {
    const keys = Object.keys(obj);
    return keys.reduce((cont, key) => {
        const val = obj[key];
        let control;
        if (Array.isArray(val)) {
            control = val.every((v) => typeof v === 'string')
                ? 'array'
                : 'object';
        } else if (typeof val === 'string') {
            control = 'text';
        } else if (typeof val === 'number') {
            control = 'number';
        } else if (typeof val === 'boolean') {
            control = 'boolean';
        } else if (false && key === 'value' && typeof val === 'object') {
            control = knobify(val);
        } else {
            control = 'object';
        }

        cont[key] = { control };

        return cont;
    }, {});
};

req.keys().forEach((path) => {
    const yaml = req(path);
    const cleanPath = path.replace('./', '').replace('.yaml', '');
    const pathElts = cleanPath.split('/');
    const filename = pathElts.pop();
    const source = require(`../core/templates/patterns/${cleanPath}.html`);
    const rawYAML = require(`!!raw-loader!../core/templates/patterns/${cleanPath}.yaml`);
    let rawMarkdown;

    try {
        const md = require(`!!raw-loader!../core/templates/patterns/${cleanPath}.md`);
        rawMarkdown = md.default || '';
    } catch {
        rawMarkdown = '';
    }

    const context = yaml?.context ?? {};

    const usage = Object.keys(context)
        .map((key) => {
            const val = context[key];
            let wrappedVal = val;

            if (Array.isArray(val)) {
                wrappedVal = '[array]';
            } else if (typeof val === 'string') {
                wrappedVal = `"${val}"`;
            } else if (typeof val === 'number') {
                wrappedVal = val;
            } else if (typeof val === 'boolean') {
                wrappedVal = val;
            } else if (typeof val === 'object') {
                wrappedVal = '[object]';
            }
            return `${key}=${wrappedVal}`;
        })
        .join(' ');

    const isBlock =
        Object.keys(context).length === 1 &&
        typeof Object.values(context)[0] === 'object';
    const blockKey = Object.keys(context)[0];

    const folders =
        pathElts.join('/').replace('molecules', 'Django Patterns') ||
        'Templates';
    const htmlPath = `patterns/${cleanPath}.html`;
    const description = `${rawMarkdown}
### Usage

🚧  Experimental, use your judgement before copy-pasting 🙈 🙉 🙊

\`\`\`django\n{% include "patterns/${cleanPath}.html" with ${usage} %}\n\`\`\`

### YAML

\`\`\`yaml\n${rawYAML.default}\n\`\`\``;

    storiesOf(`${folders} / ${filename}`, module).add(
        'Default',
        (args) => {
            return (
                <TemplatePattern
                    template={htmlPath}
                    context={isBlock ? { [blockKey]: args } : args}
                    tags={yaml.tags}
                />
            );
        },
        {
            args: isBlock ? context[blockKey] : context,
            argTypes: argTypesify(isBlock ? context[blockKey] : context),
            docs: {
                source: { code: source.default },
                extractComponentDescription: () => description,
            },
        },
    );
});
