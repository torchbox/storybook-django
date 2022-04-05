/**
 * @jest-environment jsdom
 */
import initStoryshots from '@storybook/addon-storyshots';
import { imageSnapshot } from '@storybook/addon-storyshots-puppeteer';

const patternsLoaded = () =>
  Array.from(
    document.querySelectorAll('[data-testid="storybook-django"]'),
  ).every((p) => p.dataset.state === 'loaded');

const beforeScreenshot = async (page, options) => {
  // Make sure everything is loaded.
  await page.waitForFunction(patternsLoaded);
  const callback =
    options.context.parameters && options.context.parameters.beforeScreenshot;
  if (callback) {
    await callback(page, options);
  }
};

initStoryshots({
  suite: 'Image storyshots',
  configPath: 'demo/storybook',
  test: imageSnapshot({
    storybookUrl: 'http://localhost:8001',
    beforeScreenshot,
    setupTimeout: 20000,
    testTimeout: 20000,
  }),
});
