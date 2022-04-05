import InfoBox from './InfoBox';

const wrapperStyles = {
  margin: '23px',
};

export default {
  title: 'InfoBox',
  component: InfoBox,
  decorators: [
    (Story) => (
      <div style={wrapperStyles}>
        <Story />
      </div>
    ),
  ],
};

export const Base = (args) => (
  <InfoBox {...args}>
    <h2>This is a title</h2>
    <ul>
      <li>List item 1</li>
      <li>List item 2</li>
      <li>List item 3</li>
    </ul>
  </InfoBox>
);
Base.args = { ctaLabel: 'CTA Text learn more', ctaHref: '/faq' };

export const CheckmarkTheme = Base.bind(null);
CheckmarkTheme.args = { ...Base.args, theme: 'checkmark' };

export const Headings = () => (
  <InfoBox>
    <h2>This is a title</h2>
    <h3>This is a title</h3>
    <h4>This is a title</h4>
    <p>
      This is a paragraph <a href="#link">Link text</a> and stuff and text and
      things. This is a paragraph tag text and stuff and text and things.
    </p>
  </InfoBox>
);
