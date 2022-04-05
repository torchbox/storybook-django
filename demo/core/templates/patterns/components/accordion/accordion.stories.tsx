import { expect } from '@storybook/jest';
import { userEvent, waitFor, within } from '@storybook/testing-library';
import { Pattern, generateDocs } from '../../../../../../src/react';

import template from './accordion.html';

const { docs, argTypes } = generateDocs(template);

export default {
  title: 'accordion',
  parameters: { docs },
  argTypes,
};

export const Base = (args: object) => (
  <Pattern filename={__filename} context={args} />
);
Base.args = {
  accordions: [
    { title: 'Demoing interactions A', description: 'This is interactions A.' },
    { title: 'Demoing interactions B', description: 'This is interactions B.' },
    { title: 'Demoing interactions C', description: 'This is interactions C.' },
    { title: 'Demoing interactions D', description: 'This is interactions D.' },
  ],
};

export const Interactive = Base.bind({});

Interactive.args = Base.args;

Interactive.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const pattern = canvas.getByTestId('storybook-django');
  await waitFor(
    () => expect(pattern.dataset.state).toBe('loaded'),
    {},
    { timeout: 5000 },
  );

  const buttons: HTMLButtonElement[] = canvas.queryAllByRole('button');

  if (buttons.length === 0) {
    return;
  }

  await userEvent.click(buttons[0]);
  await expect(buttons[0].getAttribute('aria-expanded')).toBe('false');
  await userEvent.click(buttons[0]);
  await expect(buttons[0].getAttribute('aria-expanded')).toBe('true');
  await userEvent.click(buttons[0]);
  await expect(buttons[0].getAttribute('aria-expanded')).toBe('false');
};
