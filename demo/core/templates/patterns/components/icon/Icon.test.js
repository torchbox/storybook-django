/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render } from '@testing-library/react';

import Icon from './Icon';

describe('Icon', () => {
    it('renders', () => {
        const { container } = render(<Icon name="microphone-on" />);
        const icon = container.querySelector('svg');
        expect(icon).toBeInTheDocument();
    });
});
