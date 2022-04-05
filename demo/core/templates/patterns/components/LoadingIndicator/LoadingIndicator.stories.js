import LoadingIndicator from './LoadingIndicator';

export default {
  title: 'LoadingIndicator',
  component: LoadingIndicator,
};

export const Base = (args) => (
  <LoadingIndicator {...args}>Loading…</LoadingIndicator>
);
