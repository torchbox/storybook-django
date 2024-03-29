import { Pattern, generateDocs } from '../../../../../../src/react';

import template from './home_banner.html';

const { docs, argTypes } = generateDocs(template);

export default {
  title: 'home_banner',
  parameters: { docs },
  argTypes,
};

export const Base = (args: object) => (
  <Pattern filename={__filename} context={args} />
);
Base.args = {
  hero_title:
    'Free advice and support for SMEs looking to adopt new technology',
  description:
    'We’re a government funded charity that offers information, We don’t push specific products',
  link_text: 'View our case studies',
  link_url: '/',
  img: {
    url: 'https://source.unsplash.com/Yh6K2eTr_FY/822x650',
    width: 822,
    height: 650,
  },
};
