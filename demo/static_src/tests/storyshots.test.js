/**
 * @jest-environment jsdom
 */
import initStoryshots from '@storybook/addon-storyshots';
import { axe, toHaveNoViolations } from 'jest-axe';
import { render } from '@testing-library/react';

expect.extend(toHaveNoViolations);

initStoryshots({
  suite: 'Storyshots smoke tests',
  configPath: 'demo/storybook',
  renderer: render,
  test: async ({ story }) => {
    // Rendering the story already constitutes a smoke test – if it fails to render there is a runtime error to investigate.
    const { container } = render(story.render());

    await new Promise((r) => {
      setTimeout(r, 2000);
    });

    // See https://github.com/nickcolley/jest-axe.
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
