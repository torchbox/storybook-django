import LoadingIndicator from './LoadingIndicator';

export default {
  title: 'LoadingIndicator',
  component: LoadingIndicator,
};

export const Default = (args) => (
  <LoadingIndicator {...args}>Loading…</LoadingIndicator>
);
