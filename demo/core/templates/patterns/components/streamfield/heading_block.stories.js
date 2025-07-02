import { Pattern } from '../../../../../../src/react';

export default {
  title: 'heading_block',
  component: Pattern,
};

/**
 * This demonstrates the most basic usage of storybook-django.
 */
export const Base = () => (
  <Pattern
    template="patterns/components/streamfield/heading_block.html"
    context={{ value: 'An important section' }}
  />
);
