/**
 * @jest-environment jsdom
 */
import initStoryshots from '@storybook/addon-storyshots';
import { render, waitFor } from '@testing-library/react';

jest.setTimeout(20000);

initStoryshots({
  suite: 'Storyshots snapshot tests',
  configPath: 'demo/storybook',
  test: async ({ story }) => {
    const { container, queryAllByTestId } = render(story.render());

    const patterns = queryAllByTestId('storybook-django');

    if (patterns.length > 0) {
      await waitFor(
        () => {
          const loaded = patterns.every((p) => p.dataset.state === 'loaded');
          expect(loaded).toBe(true);
        },
        { timeout: 20000 },
      );
    }

    expect(container).toMatchSnapshot();
  },
});
