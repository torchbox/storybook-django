/**
 * @jest-environment jsdom
 */
import initStoryshots from '@storybook/addon-storyshots';
import { axe, toHaveNoViolations } from 'jest-axe';
import { render, waitFor } from '@testing-library/react';

expect.extend(toHaveNoViolations);

initStoryshots({
  suite: 'Storyshots smoke tests',
  configPath: 'demo/storybook',
  test: async ({ story }) => {
    // Rendering the story already constitutes a smoke test – if it fails to render there is a runtime error to investigate.
    const { container, queryAllByTestId } = render(story.render());

    const patterns = queryAllByTestId('storybook-django');

    if (patterns.length > 0) {
      await waitFor(
        () => expect(patterns.map((p) => p.dataset.state)).toContain('loaded'),
        { timeout: 10000 },
      );
    }

    const results = await axe(container, {
      // See https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md for a list of rules.
      // Try to only disable rules if strictly needed, alternatively also consider excluding stories from those tests
      // with the `storyshots` parameter: https://github.com/storybookjs/storybook/tree/master/addons/storyshots/storyshots-core#disable.
      rules: {
        // Disabled because stories are expected to be rendered outside of landmarks for testing.
        region: { enabled: false },
      },
    });

    expect(results).toHaveNoViolations();
  },
});
