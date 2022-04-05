/**
 * @jest-environment jsdom
 */
import initStoryshots from '@storybook/addon-storyshots';
import { render, waitFor } from '@testing-library/react';

initStoryshots({
  suite: 'Storyshots snapshot tests',
  configPath: 'demo/storybook',
  test: async ({ story }) => {
    const { container, queryAllByTestId } = render(story.render());

    const patterns = queryAllByTestId('storybook-django');

    if (patterns.length > 0) {
      await waitFor(
        () => expect(patterns.map((p) => p.dataset.state)).toContain('loaded'),
        { timeout: 10000 },
      );
    }

    expect(container).toMatchSnapshot();
  },
});
