import { storiesOf } from '@storybook/react';
import React from 'react';

import InfoBox from './InfoBox';

const wrapperStyles = {
    margin: '23px',
};

storiesOf('InfoBox', module)
    .addDecorator((Story) => (
        <div style={wrapperStyles}>
            <Story />
        </div>
    ))
    .add('Default', () => (
        <InfoBox ctaLabel="CTA Text learn more" ctaHref="/faq">
            <h2>This is a title</h2>
            <ul>
                <li>List item 1</li>
                <li>List item 2</li>
                <li>List item 3</li>
            </ul>
        </InfoBox>
    ))
    .add('Checkmark', () => (
        <InfoBox
            ctaLabel="CTA Text learn more"
            ctaHref="/faq"
            theme="checkmark"
        >
            <h2>This is a title</h2>
            <ul>
                <li>List item 1</li>
                <li>List item 2</li>
                <li>List item 3</li>
            </ul>
        </InfoBox>
    ))
    .add('Headings', () => (
        <InfoBox>
            <h2>This is a title</h2>
            <h3>This is a title</h3>
            <h4>This is a title</h4>
            <p>
                This is a paragraph <a href="#link">Link text</a> and stuff and
                text and things. This is a paragraph tag text and stuff and text
                and things.
            </p>
        </InfoBox>
    ));
