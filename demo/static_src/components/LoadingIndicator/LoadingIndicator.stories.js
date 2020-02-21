import { storiesOf } from '@storybook/react';
import React from 'react';

import LoadingIndicator from './LoadingIndicator';

storiesOf('LoadingIndicator', module)
    .add('Centre', () => (
        <LoadingIndicator theme="centre">Loading...</LoadingIndicator>
    ))
    .add('Left', () => (
        <LoadingIndicator theme="left">Loading...</LoadingIndicator>
    ));
