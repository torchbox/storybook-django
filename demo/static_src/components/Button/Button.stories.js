import { storiesOf } from '@storybook/react';
import React from 'react';

import Button, { BUTTON_THEMES } from './Button';

storiesOf('Button', module)
    .add('All buttons', () => (
        <>
            <p>Buttons:</p>
            {BUTTON_THEMES.map((theme) => (
                <Button
                    key={theme}
                    theme={theme}
                    icon={theme.includes('circle') ? 'microphone' : null}
                >
                    {theme.includes('circle') ? null : theme}
                </Button>
            ))}
            <p>Link buttons:</p>
            {BUTTON_THEMES.map((theme) => (
                <Button
                    to={theme}
                    key={`to-${theme}`}
                    theme={theme}
                    title={theme}
                    icon={theme.includes('circle') ? 'microphone' : null}
                >
                    {theme.includes('circle') ? null : theme}
                </Button>
            ))}
        </>
    ))
    .add('Button icons', () => (
        <>
            <p>Icon before:</p>
            <Button theme="secondary" iconBefore="off-site">
                View calendar
            </Button>
            <p>Icon after:</p>
            <Button theme="secondary" iconAfter="off-site">
                View calendar
            </Button>
            <p>Icon before & after:</p>
            <Button
                theme="secondary"
                iconBefore="off-site"
                iconAfter="off-site"
            >
                View calendar
            </Button>
            <p>Icon only:</p>
            <Button
                theme="secondary"
                aria-label="View calendar"
                icon="off-site"
            />
        </>
    ));
